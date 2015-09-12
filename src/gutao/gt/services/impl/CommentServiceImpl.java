package gutao.gt.services.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gutao.gt.dao.CommentMapper;
import gutao.gt.model.Comment;
import gutao.gt.model.PageModel;
import gutao.gt.services.CommentServiceI;
@Service("commentservice")
public class CommentServiceImpl implements CommentServiceI {
    private CommentMapper commentMapper;
    
	public CommentMapper getCommentMapper() {
		return commentMapper;
	}
    @Autowired
	public void setCommentMapper(CommentMapper commentMapper) {
		this.commentMapper = commentMapper;
	}

	@Override
	public List<Comment> showAll(String titleid) {
		List<Comment> list =commentMapper.showAll(titleid);
		return list;
	}

	@Override
	public int saveComment(Comment comment) {
		comment.setId(UUID.randomUUID().toString());
		comment.setDate(new Date());
		int result = commentMapper.insertSelective(comment);
		return result;
	}

	@Override
	public int countTitleComment(String titleid) {
		int count = commentMapper.countAll(titleid);
		return count;
	}
	@Override
	public List<Comment> showCommentPage(HashMap<String, Object> map) {
		List<Comment> list = commentMapper.showPage(map);
		return list;
	}

}
