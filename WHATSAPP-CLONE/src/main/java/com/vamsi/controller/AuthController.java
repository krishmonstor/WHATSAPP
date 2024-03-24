package com.vamsi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vamsi.config.JwtTokenValidator;
import com.vamsi.config.TokenProvider;
import com.vamsi.exception.UserException;
import com.vamsi.model.User;
import com.vamsi.repository.UserRepository;
import com.vamsi.request.LoginRequest;
import com.vamsi.response.AuthResponse;
import com.vamsi.serviceimpl.CustomUserService;

@RestControllerAdvice
@RequestMapping("/auth")
public class AuthController 
{
	@Autowired
	private UserRepository userrepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomUserService customUserService;
	@Autowired
	private TokenProvider tokenProvider;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user)
	{
		
		String full_name = user.getFull_name();
		String email= user.getEmail();
		String password = user.getPassword();
		
		User isUser = userrepository.findByEmail(email);
		if(isUser != null)
		{
			throw new UserException("Email is used with another account " + email);
		}
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFull_name(full_name);
		createdUser.setPassword(password);
		
		userrepository.save(createdUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(jwt,true);
		return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req)
	{
		String email = req.getEmail();
		String password = req.getEmail();
		Authentication authentication = authenticate(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		AuthResponse res = new AuthResponse(jwt,true);
		return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);
	}
	public Authentication authenticate(String Username,String password)
	{
		UserDetails userDetails = customUserService.loadUserByUsername(Username);
		if(userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password or username");
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
	}
}
