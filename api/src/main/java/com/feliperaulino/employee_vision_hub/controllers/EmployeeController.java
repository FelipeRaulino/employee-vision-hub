package com.feliperaulino.employee_vision_hub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.feliperaulino.employee_vision_hub.data.dto.EmployeeRequestDto;
import com.feliperaulino.employee_vision_hub.data.dto.EmployeeResponseDto;
import com.feliperaulino.employee_vision_hub.services.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
  public ResponseEntity<List<EmployeeResponseDto>> getAll() {
    return ResponseEntity.ok(employeeService.findAll());
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
  public ResponseEntity<EmployeeResponseDto> getById(@PathVariable Long id) {
    return ResponseEntity.ok(employeeService.findById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
  public ResponseEntity<EmployeeResponseDto> create(@RequestBody EmployeeRequestDto dto) {
    return ResponseEntity.ok(employeeService.create(dto));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
  public ResponseEntity<EmployeeResponseDto> update(@PathVariable Long id, @RequestBody EmployeeRequestDto dto) {
    return ResponseEntity.ok(employeeService.update(id, dto));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    employeeService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
