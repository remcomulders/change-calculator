package com.example.api.dto;

import java.math.BigDecimal;
import java.util.List;

public class ChangeResponseDto {
    private BigDecimal totalChange;
    private List<DenominationDto> denominationBreakdown;
    private String currency;

    public BigDecimal getTotalChange() {
        return totalChange;
    }

    public void setTotalChange(BigDecimal totalChange) {
        this.totalChange = totalChange;
    }

    public List<DenominationDto> getDenominationBreakdown() {
        return denominationBreakdown;
    }

    public void setDenominationBreakdown(List<DenominationDto> denominationBreakdown) {
        this.denominationBreakdown = denominationBreakdown;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
