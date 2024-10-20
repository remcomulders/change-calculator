package com.example.api.dto;

import java.math.BigDecimal;

public class ChangeRequestDto {
    private BigDecimal totalGiven;
    private BigDecimal transactionAmount;
    private String currency;

    public BigDecimal getTotalGiven() {
        return totalGiven;
    }

    public void setTotalGiven(BigDecimal totalGiven) {
        this.totalGiven = totalGiven;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
