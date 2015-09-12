package gutao.gt.services.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gutao.gt.dao.UserMapper;
import gutao.gt.model.User;
import gutao.gt.services.UserServiceI;
@Service("userservice")
public class UserServiceImpl implements UserServiceI {
    private UserMapper userMapper;
    
	public UserMapper getUserMapper() {
		return userMapper;
	}
    @Autowired
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public User search(String id) {
		// TODO Auto-generated method stub
		User user = userMapper.selectByPrimaryKey(id);
		return user;
	}
	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		List<User> l = userMapper.getAll();
		return l;
	}
	@Override
	public List<User> getAllRole() {
		List<User> l = userMapper.getAllRole();
		return l;
	}
	@Override
	public User checkUsername(String username) {
		// TODO Auto-generated method stub
		User user = userMapper.checkUsername(username);
		return user;
	}
	@Override
	public int insertUser(User user) {
		// TODO Auto-generated method stub
		user.setId(UUID.randomUUID().toString());
		user.setCreatedatetime(new Date());
		int result = userMapper.insertSelective(user);
		return result;
	}
	@Override
	public User checkLogin(User user) {
		User u = userMapper.checkLogin(user); 
		return u;
	}

}
