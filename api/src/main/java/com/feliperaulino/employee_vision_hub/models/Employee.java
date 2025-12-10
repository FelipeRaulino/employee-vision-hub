package com.feliperaulino.employee_vision_hub.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @Column(name = "admission_date")
  private LocalDate admissionDate;

  private BigDecimal salary;

  @Enumerated(EnumType.STRING)
  private EmployeeStatus status;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDate getAdmissionDate() {
    return admissionDate;
  }

  public void setAdmissionDate(LocalDate admissionDate) {
    this.admissionDate = admissionDate;
  }

  public BigDecimal getSalary() {
    return salary;
  }

  public void setSalary(BigDecimal salary) {
    this.salary = salary;
  }

  public EmployeeStatus getStatus() {
    return status;
  }

  public void setStatus(EmployeeStatus status) {
    this.status = status;
  }
}
