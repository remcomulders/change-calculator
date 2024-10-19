package com.example.api.service;

import com.example.api.dto.DenominationDto;
import com.example.api.entity.CurrencyDenomination;
import com.example.api.repository.CurrencyDenominationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class ChangeServiceTests {

    @Mock
    private CurrencyDenominationRepository currencyDenominationRepository;

    @InjectMocks
    private ChangeService changeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCalculateChange() {
        CurrencyDenomination fiftyPound = new CurrencyDenomination();
        fiftyPound.setCurrency("GBP");
        fiftyPound.setValue(new BigDecimal("50"));
        fiftyPound.setName("50 Pound Bill");

        CurrencyDenomination twentyPound = new CurrencyDenomination();
        twentyPound.setCurrency("GBP");
        twentyPound.setValue(new BigDecimal("20"));
        twentyPound.setName("20 Pound Bill");

        when(currencyDenominationRepository.findByCurrencyOrderByValueDesc("GBP"))
                .thenReturn(Arrays.asList(fiftyPound, twentyPound));

        List<DenominationDto> result = changeService.calculateChange(
                new BigDecimal("100"), // totalGiven
                new BigDecimal("30"), // transactionAmount
                "GBP" // currency
        );

        assertEquals(2, result.size());
        assertEquals("50 Pound Bill", result.get(0).getType());
        assertEquals(1, result.get(0).getAmount());
        assertEquals(new BigDecimal("50"), result.get(0).getValue());

        assertEquals("20 Pound Bill", result.get(1).getType());
        assertEquals(1, result.get(1).getAmount());
        assertEquals(new BigDecimal("20"), result.get(1).getValue());
    }
}
