package com.example.api.service;

import com.example.api.dto.DenominationDto;
import com.example.api.entity.CurrencyDenomination;
import com.example.api.repository.CurrencyDenominationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChangeService {
    private final CurrencyDenominationRepository currencyDenominationRepository;

    @Autowired
    public ChangeService(CurrencyDenominationRepository currencyDenominationRepository) {
        this.currencyDenominationRepository = currencyDenominationRepository;
    }

    public List<DenominationDto> calculateChange(BigDecimal totalGiven, BigDecimal transactionAmount, String currency) {
        BigDecimal change = totalGiven.subtract(transactionAmount);

        if (change.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Not enough money given for the transaction");
        }

        return calculateDenominations(change, currency);
    }

    private List<DenominationDto> calculateDenominations(BigDecimal amount, String currency) {
        List<DenominationDto> result = new ArrayList<>();
        List<CurrencyDenomination> denominations = currencyDenominationRepository
                .findByCurrencyOrderByValueDesc(currency);

        if (denominations.isEmpty()) {
            throw new IllegalArgumentException("Unsupported currency: " + currency);
        }

        for (CurrencyDenomination denomination : denominations) {
            BigDecimal denominationValue = denomination.getValue();
            String denominationName = denomination.getName();

            int count = amount.divideToIntegralValue(denominationValue).intValue();
            if (count > 0) {
                BigDecimal totalValue = denominationValue.multiply(new BigDecimal(count));

                DenominationDto dto = new DenominationDto();
                dto.setAmount(count);
                dto.setType(denominationName);
                dto.setValue(totalValue);
                result.add(dto);

                amount = amount.remainder(denominationValue);
            }
        }

        return result;
    }
}
