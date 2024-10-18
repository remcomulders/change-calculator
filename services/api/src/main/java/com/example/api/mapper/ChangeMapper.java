package com.example.api.mapper;

import com.example.api.dto.ChangeResponseDto;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@Component
public class ChangeMapper {

    public ChangeResponseDto mapToChangeResponseDto(Map<String, Object> result) {
        ChangeResponseDto responseDto = new ChangeResponseDto();
        responseDto.setTotalChange((BigDecimal) result.get("totalChange"));
        responseDto.setDenominationBreakdown((Map<String, Integer>) result.get("denominationBreakdown"));
        return responseDto;
    }
}
