package com.feliperaulino.employee_vision_hub.data.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.feliperaulino.employee_vision_hub.models.EmployeeStatus;

public record EmployeeRequestDto(
    String name,
    LocalDate admissionDate,
    BigDecimal salary,
    EmployeeStatus status) {
}
