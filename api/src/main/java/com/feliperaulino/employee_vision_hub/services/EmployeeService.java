package com.feliperaulino.employee_vision_hub.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.feliperaulino.employee_vision_hub.data.dto.EmployeeRequestDto;
import com.feliperaulino.employee_vision_hub.data.dto.EmployeeResponseDto;
import com.feliperaulino.employee_vision_hub.models.Employee;
import com.feliperaulino.employee_vision_hub.repositories.EmployeeRepository;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  public List<EmployeeResponseDto> findAll() {
    return employeeRepository.findAll().stream()
        .map(this::toResponseDto)
        .collect(Collectors.toList());
  }

  public EmployeeResponseDto findById(Long id) {
    Employee emp = employeeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Employee not found"));
    return toResponseDto(emp);
  }

  public EmployeeResponseDto create(EmployeeRequestDto dto) {
    Employee emp = new Employee();
    emp.setName(dto.name());
    emp.setAdmissionDate(dto.admissionDate());
    emp.setSalary(dto.salary());
    emp.setStatus(dto.status());
    return toResponseDto(employeeRepository.save(emp));
  }

  public EmployeeResponseDto update(Long id, EmployeeRequestDto dto) {
    Employee emp = employeeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Employee not found"));

    emp.setName(dto.name());
    emp.setAdmissionDate(dto.admissionDate());
    emp.setSalary(dto.salary());
    emp.setStatus(dto.status());

    return toResponseDto(employeeRepository.save(emp));
  }

  public void delete(Long id) {
    employeeRepository.deleteById(id);
  }

  private EmployeeResponseDto toResponseDto(Employee emp) {
    return new EmployeeResponseDto(
        emp.getId(),
        emp.getName(),
        emp.getAdmissionDate(),
        emp.getSalary(),
        emp.getStatus());
  }
}
