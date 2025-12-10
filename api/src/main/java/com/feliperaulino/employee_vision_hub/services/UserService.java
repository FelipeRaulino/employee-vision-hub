package com.feliperaulino.employee_vision_hub.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.feliperaulino.employee_vision_hub.config.SecurityConfiguration;
import com.feliperaulino.employee_vision_hub.data.dto.CreateUserDto;
import com.feliperaulino.employee_vision_hub.data.dto.LoginUserDto;
import com.feliperaulino.employee_vision_hub.data.dto.RecoveryJwtTokenDto;
import com.feliperaulino.employee_vision_hub.models.Role;
import com.feliperaulino.employee_vision_hub.models.User;
import com.feliperaulino.employee_vision_hub.models.UserDetailsImpl;
import com.feliperaulino.employee_vision_hub.models.UserRole;
import com.feliperaulino.employee_vision_hub.repositories.RoleRepository;
import com.feliperaulino.employee_vision_hub.repositories.UserRepository;

@Service
public class UserService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenService jwtTokenService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private SecurityConfiguration securityConfiguration;

  public RecoveryJwtTokenDto authenticateUser(LoginUserDto loginUserDto) {
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
        loginUserDto.email(), loginUserDto.password());

    try {
      Authentication authentication = authenticationManager.authenticate(token);
      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
    } catch (AuthenticationException ex) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials", ex);
    }
  }

  public void createUser(CreateUserDto dto) {
    UserRole roleEnum = dto.role();
    Role role = roleRepository.findByName(roleEnum)
        .orElseGet(() -> roleRepository.save(new Role(roleEnum)));

    String password = securityConfiguration.passwordEncoder().encode(dto.password());
    User newUser = new User(dto.email(), password, role);
    userRepository.save(newUser);
  }
}
