package com.feliperaulino.employee_vision_hub.data.dto;

import com.feliperaulino.employee_vision_hub.models.UserRole;

public record CreateUserDto(
    String email,
    String password,
    UserRole role) {
}
