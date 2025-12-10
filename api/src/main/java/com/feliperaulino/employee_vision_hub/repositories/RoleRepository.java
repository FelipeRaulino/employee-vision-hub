package com.feliperaulino.employee_vision_hub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.feliperaulino.employee_vision_hub.models.Role;
import com.feliperaulino.employee_vision_hub.models.UserRole;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(UserRole name);
}
