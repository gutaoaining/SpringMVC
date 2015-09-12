package gutao.gt.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import gutao.gt.model.Comment;
import gutao.gt.model.PageModel;
import gutao.gt.model.ResponseModel;
import gutao.gt.services.CommentServiceI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CommentController extends BaseController {
	private CommentServiceI commentservice;

	public CommentServiceI getCommentservice() {
		return commentservice;
	}
    @Autowired
	public void setCommentservice(CommentServiceI commentservice) {
		this.commentservice = commentservice;
	}
    @RequestMapping(value = "comment_add",method=RequestMethod.POST)
    public void saveComment(Comment comment,HttpServletResponse response){
    	ResponseModel responseModel = new ResponseModel();
    	int result = commentservice.saveComment(comment);
    	if(result == 1){
    		responseModel.setSuccess(true);
    		responseModel.setMsg("评论成功！");
    	}else{
    		responseModel.setMsg("评论失败！");
    	}
    	Thread thread= new Thread();
		try {
			thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	writeJson(responseModel, response);
    }
    
    
    @RequestMapping(value = "comment_show",method=RequestMethod.POST)
    public void showComment(String titleid,HttpServletResponse response){
       List<Comment> list = commentservice.showAll(titleid);
       Thread thread= new Thread();
		try {
			thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       writeJson(list, response);
    }
    
    @RequestMapping(value = "comment_showpage",method=RequestMethod.POST)
    public void showCommentpage(String titleid,String page,HttpServletResponse response){
       PageModel pageModel = new PageModel();
       int pg =1;
       if(page!=null&&!page.trim().equals("")){
    	   pg =Integer.parseInt(page);
       }
       pageModel.setPageNow(pg);
       int allComment = commentservice.countTitleComment(titleid);
       System.out.println("这个论题的评论总条数："+allComment);
       int pageall = (int) Math.ceil((double)allComment/pageModel.getPagesize());
       System.out.println("按每页4条评论，一共有："+pageall+"页");
       int limitrow = (pg-1)*4;
       HashMap<String, Object> map = new HashMap<String, Object>();
       map.put("pageAll", pageall);
       map.put("titleid", titleid);
       map.put("pageszie", 4);
       map.put("limitrow", limitrow);
       List<Comment> list = commentservice.showCommentPage(map);
       Thread thread= new Thread();
		try {
			thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       writeJson(list, response);
    }
}
