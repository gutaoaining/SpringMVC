package gutao.gt.dao;

import java.util.HashMap;
import java.util.List;

import gutao.gt.model.Comment;

public interface CommentMapper {
    int deleteByPrimaryKey(String id);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKeyWithBLOBs(Comment record);

    int updateByPrimaryKey(Comment record);

	List<Comment> showAll(String titleid);
	
	int countAll(String titleid);
	
	List<Comment> showPage(HashMap<String, Object> map);
}