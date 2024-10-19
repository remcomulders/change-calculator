package com.example.api.controller;

import com.example.api.dto.ChangeRequestDto;
import com.example.api.dto.ChangeResponseDto;
import com.example.api.dto.DenominationDto;
import com.example.api.service.ChangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/change")
public class ChangeController {
    private final ChangeService changeService;

    @Autowired
    public ChangeController(ChangeService changeService) {
        this.changeService = changeService;
    }

    @PostMapping
    public ChangeResponseDto calculateChange(@RequestBody ChangeRequestDto request) {
        List<DenominationDto> denominations = changeService.calculateChange(
                request.getTotalGiven(),
                request.getTransactionAmount(),
                request.getCurrency());

        ChangeResponseDto responseDto = new ChangeResponseDto();
        responseDto.setTotalChange(request.getTotalGiven().subtract(request.getTransactionAmount()));
        responseDto.setDenominationBreakdown(denominations);
        responseDto.setCurrency(request.getCurrency());

        return responseDto;
    }
}
