package gutao.gt.services;

import java.util.List;

import gutao.gt.model.User;

public interface UserServiceI {
	public User search(String id);

	public List<User> getAll();

	public List<User> getAllRole();
	
	public User checkUsername(String userame);
	
	public int insertUser(User user); 
	
	public User checkLogin(User user);
}
