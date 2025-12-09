package com.feliperaulino.employee_vision_hub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.feliperaulino.employee_vision_hub.entities.Publishers;
import com.feliperaulino.employee_vision_hub.services.PublishersService;

@RestController
@RequestMapping("/api/publishers")
public class PublishersController {
  @Autowired
  PublishersService publishersService;

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Publishers> getAll() {
    return publishersService.findAll();
  }
}
