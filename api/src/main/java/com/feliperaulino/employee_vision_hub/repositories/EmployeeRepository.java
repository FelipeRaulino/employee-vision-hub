package com.feliperaulino.employee_vision_hub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.feliperaulino.employee_vision_hub.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
