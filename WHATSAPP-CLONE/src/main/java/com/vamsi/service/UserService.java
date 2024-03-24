package com.vamsi.service;

import java.util.List;

import com.vamsi.exception.UserException;
import com.vamsi.model.User;
import com.vamsi.request.UpdateUserRequest;

public interface UserService 
{
	public User findUserById(Integer id);
	public User findUserProfile(String jwt);
	public User updateUser(Integer userid,UpdateUserRequest req) throws UserException;
	public List<User> searchuser(String query);
}
