package com.feliperaulino.employee_vision_hub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.feliperaulino.employee_vision_hub.entities.Publishers;
import com.feliperaulino.employee_vision_hub.repositories.PublishersRepository;

@Service
public class PublishersService {
  @Autowired
  private PublishersRepository publishersRepository;

  public Publishers save(Publishers publisher) {
    return publishersRepository.save(publisher);
  }

  public List<Publishers> findAll() {
    return publishersRepository.findAll();
  }

  public Publishers findById(int id) {
    return publishersRepository.findById(id).orElseThrow(() -> new RuntimeException("Publisher not found"));
  }
}
