package com.example.api.controller;

import com.example.api.dto.ChangeRequestDto;
import com.example.api.dto.DenominationDto;
import com.example.api.service.ChangeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class ChangeControllerTests {

    private MockMvc mockMvc;

    @Mock
    private ChangeService changeService;

    @InjectMocks
    private ChangeController changeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(changeController).build();
    }

    @Test
    void testCalculateChange() throws Exception {
        DenominationDto fiftyPoundDto = new DenominationDto();
        fiftyPoundDto.setAmount(1);
        fiftyPoundDto.setType("50 Pound Bill");
        fiftyPoundDto.setValue(new BigDecimal("50"));

        DenominationDto twentyPoundDto = new DenominationDto();
        twentyPoundDto.setAmount(1);
        twentyPoundDto.setType("20 Pound Bill");
        twentyPoundDto.setValue(new BigDecimal("20"));

        when(changeService.calculateChange(
                new BigDecimal("100"), // totalGiven
                new BigDecimal("30"), // transactionAmount
                "GBP" // currency
        )).thenReturn(Arrays.asList(fiftyPoundDto, twentyPoundDto));

        ChangeRequestDto requestDto = new ChangeRequestDto();
        requestDto.setTotalGiven(new BigDecimal("100"));
        requestDto.setTransactionAmount(new BigDecimal("30"));
        requestDto.setCurrency("GBP");

        mockMvc.perform(post("/change")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"totalGiven\": 100, \"transactionAmount\": 30, \"currency\": \"GBP\" }"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.totalChange").value(70))
                .andExpect(jsonPath("$.denominationBreakdown[0].type").value("50 Pound Bill"))
                .andExpect(jsonPath("$.denominationBreakdown[0].amount").value(1))
                .andExpect(jsonPath("$.denominationBreakdown[0].value").value(50))
                .andExpect(jsonPath("$.denominationBreakdown[1].type").value("20 Pound Bill"))
                .andExpect(jsonPath("$.denominationBreakdown[1].amount").value(1))
                .andExpect(jsonPath("$.denominationBreakdown[1].value").value(20))
                .andExpect(jsonPath("$.currency").value("GBP"));
    }
}
