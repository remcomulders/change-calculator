package com.example.api.mapper;

import com.example.api.dto.ChangeResponseDto;
import com.example.api.dto.DenominationDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ChangeMapperTests {
    private ChangeMapper changeMapper;

    @BeforeEach
    void setUp() {
        changeMapper = new ChangeMapper();
    }

    @Test
    void testMapToChangeResponseDto() {
        Map<String, Object> denomination1 = new HashMap<>();
        denomination1.put("amount", 1);
        denomination1.put("type", "50 Pound Bill");
        denomination1.put("value", new BigDecimal("50"));

        Map<String, Object> denomination2 = new HashMap<>();
        denomination2.put("amount", 1);
        denomination2.put("type", "20 Pound Bill");
        denomination2.put("value", new BigDecimal("20"));

        List<Map<String, Object>> breakdownList = Arrays.asList(denomination1, denomination2);

        Map<String, Object> result = new HashMap<>();
        result.put("totalChange", new BigDecimal("70"));
        result.put("denominationBreakdown", breakdownList);

        ChangeResponseDto responseDto = changeMapper.mapToChangeResponseDto(result);

        assertNotNull(responseDto);
        assertEquals(new BigDecimal("70"), responseDto.getTotalChange());
        assertEquals(2, responseDto.getDenominationBreakdown().size());

        DenominationDto dto1 = responseDto.getDenominationBreakdown().get(0);
        assertEquals(1, dto1.getAmount());
        assertEquals("50 Pound Bill", dto1.getType());
        assertEquals(new BigDecimal("50"), dto1.getValue());

        DenominationDto dto2 = responseDto.getDenominationBreakdown().get(1);
        assertEquals(1, dto2.getAmount());
        assertEquals("20 Pound Bill", dto2.getType());
        assertEquals(new BigDecimal("20"), dto2.getValue());
    }
}
