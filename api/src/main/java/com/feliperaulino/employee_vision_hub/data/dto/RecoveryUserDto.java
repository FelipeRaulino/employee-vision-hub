package com.feliperaulino.employee_vision_hub.data.dto;

import java.util.List;

import com.feliperaulino.employee_vision_hub.models.Role;

public record RecoveryUserDto(
    Long id,
    String email,
    List<Role> roles) {
}
