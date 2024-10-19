package com.example.api.mapper;

import com.example.api.dto.ChangeResponseDto;
import com.example.api.dto.DenominationDto;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class ChangeMapper {
    public ChangeResponseDto mapToChangeResponseDto(Map<String, Object> result) {
        ChangeResponseDto responseDto = new ChangeResponseDto();
        responseDto.setTotalChange((BigDecimal) result.get("totalChange"));

        List<Map<String, Object>> breakdownList = (List<Map<String, Object>>) result.get("denominationBreakdown");
        List<DenominationDto> denominationBreakdown = new ArrayList<>();

        for (Map<String, Object> entry : breakdownList) {
            DenominationDto denominationDto = new DenominationDto();
            denominationDto.setAmount((Integer) entry.get("amount"));
            denominationDto.setType((String) entry.get("type"));
            denominationDto.setValue(new BigDecimal(entry.get("value").toString()));
            denominationBreakdown.add(denominationDto);
        }

        responseDto.setDenominationBreakdown(denominationBreakdown);
        return responseDto;
    }
}
