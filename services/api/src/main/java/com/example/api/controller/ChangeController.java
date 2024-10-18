package com.example.api.controller;

import com.example.api.dto.ChangeRequestDto;
import com.example.api.dto.ChangeResponseDto;
import com.example.api.service.ChangeService;
import com.example.api.mapper.ChangeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RestController
@RequestMapping("/change")
public class ChangeController {

    private final ChangeService changeService;
    private final ChangeMapper changeMapper;

    @Autowired
    public ChangeController(ChangeService changeService, ChangeMapper changeMapper) {
        this.changeService = changeService;
        this.changeMapper = changeMapper;
    }

    @PostMapping
    public ChangeResponseDto calculateChange(@RequestBody ChangeRequestDto request) {
        Map<String, Object> result = changeService.calculateChange(
                request.getTotalGiven(),
                request.getTransactionAmount(),
                request.getCurrency());

        return changeMapper.mapToChangeResponseDto(result);
    }
}
