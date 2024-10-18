package com.example.api.service;

import com.example.api.entity.CurrencyDenomination;
import com.example.api.repository.CurrencyDenominationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ChangeService {

    private final CurrencyDenominationRepository currencyDenominationRepository;

    @Autowired
    public ChangeService(CurrencyDenominationRepository currencyDenominationRepository) {
        this.currencyDenominationRepository = currencyDenominationRepository;
    }

    public Map<String, Object> calculateChange(BigDecimal totalGiven, BigDecimal transactionAmount, String currency) {
        BigDecimal change = totalGiven.subtract(transactionAmount);

        if (change.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Not enough money given for the transaction");
        }

        Map<String, Integer> denominationCounts = calculateDenominations(change, currency);

        Map<String, Object> result = new HashMap<>();
        result.put("totalChange", change);
        result.put("denominationBreakdown", denominationCounts);

        return result;
    }

    private Map<String, Integer> calculateDenominations(BigDecimal amount, String currency) {
        Map<String, Integer> result = new HashMap<>();
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
                result.put(denominationName, count);
                amount = amount.remainder(denominationValue);
            }
        }

        return result;
    }
}