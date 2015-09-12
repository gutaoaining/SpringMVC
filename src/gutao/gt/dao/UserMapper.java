package gutao.gt.dao;


import java.util.List;

import gutao.gt.model.User;

public interface UserMapper {
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    List<User> getAll();
    
    List<User> getAllRole();
    
    User checkUsername(String username);
    
    User checkLogin(User user);
}