package com.example.api.dto;

import java.math.BigDecimal;
import java.util.Map;

public class ChangeResponseDto {
    private BigDecimal totalChange;
    private Map<String, Integer> denominationBreakdown;

    // Getters and setters
    public BigDecimal getTotalChange() {
        return totalChange;
    }

    public void setTotalChange(BigDecimal totalChange) {
        this.totalChange = totalChange;
    }

    public Map<String, Integer> getDenominationBreakdown() {
        return denominationBreakdown;
    }

    public void setDenominationBreakdown(Map<String, Integer> denominationBreakdown) {
        this.denominationBreakdown = denominationBreakdown;
    }
}