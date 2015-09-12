package gutao.gt.controller;


import java.util.List;

import gutao.gt.model.QuestionContent;
import gutao.gt.services.QuestionServiceI;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class QuestionController extends BaseController {
	private QuestionServiceI questionservice;

	public QuestionServiceI getQuestionservice() {
		return questionservice;
	}

	@Autowired
	public void setQuestionservice(QuestionServiceI questionservice) {
		this.questionservice = questionservice;
	}

	@RequestMapping(value = "add_content")
	public void conetnt_save(QuestionContent qcontent,
			HttpServletResponse response) {
		boolean sign = true;
		int result = questionservice.contentSave(qcontent); 
		if(result==1){
			sign = true;
		}
		Thread thread = new Thread();
		try {
			thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		writeJson(sign, response);
	}
//	@RequestMapping(value = "content_show")
//	@ResponseBody 
//	public List<QuestionContent> resultpage(Model model){
//	    List<QuestionContent> list = questionservice.contentShow(); 
//		return list;
//	}
	@RequestMapping(value = "content_show")
	public void resultpage(HttpServletResponse response) {
		List<QuestionContent> list = questionservice.contentShow(); 
		writeJson(list, response);
	}
}
