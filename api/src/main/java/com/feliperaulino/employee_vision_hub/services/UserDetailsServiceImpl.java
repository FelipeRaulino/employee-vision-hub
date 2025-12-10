package com.feliperaulino.employee_vision_hub.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.feliperaulino.employee_vision_hub.models.User;
import com.feliperaulino.employee_vision_hub.models.UserDetailsImpl;
import com.feliperaulino.employee_vision_hub.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
    return new UserDetailsImpl(user);
  }

}
