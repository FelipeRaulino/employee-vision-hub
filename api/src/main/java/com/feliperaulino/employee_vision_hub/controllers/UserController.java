package com.feliperaulino.employee_vision_hub.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.feliperaulino.employee_vision_hub.data.dto.CreateUserDto;
import com.feliperaulino.employee_vision_hub.data.dto.LoginUserDto;
import com.feliperaulino.employee_vision_hub.data.dto.RecoveryJwtTokenDto;
import com.feliperaulino.employee_vision_hub.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<RecoveryJwtTokenDto> authenticateUser(@RequestBody LoginUserDto loginUserDto) {
    RecoveryJwtTokenDto token = userService.authenticateUser(loginUserDto);
    return new ResponseEntity<>(token, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Void> createUser(@RequestBody CreateUserDto createUserDto) {
    userService.createUser(createUserDto);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

}
