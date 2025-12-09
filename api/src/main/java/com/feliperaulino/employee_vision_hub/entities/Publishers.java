package com.feliperaulino.employee_vision_hub.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Publishers {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String locations;
  private int journals;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLocations() {
    return locations;
  }

  public void setLocations(String locations) {
    this.locations = locations;
  }

  public int getJournals() {
    return journals;
  }

  public void setName(int journals) {
    this.journals = journals;
  }
}
