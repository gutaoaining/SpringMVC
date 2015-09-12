package gutao.gt.services;

import gutao.gt.model.Comment;
import gutao.gt.model.PageModel;

import java.util.HashMap;
import java.util.List;

public interface CommentServiceI {
	public List<Comment> showAll(String titleid);

	public int saveComment(Comment comment);
	
	public List<Comment> showCommentPage(HashMap<String, Object> map);
	
	public int countTitleComment(String titleid);
}
