package com.example.api.repository;

import com.example.api.entity.CurrencyDenomination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrencyDenominationRepository extends JpaRepository<CurrencyDenomination, Long> {
    List<CurrencyDenomination> findByCurrencyOrderByValueDesc(String currency);
}
