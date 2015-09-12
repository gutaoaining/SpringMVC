package gutao.gt.controller;



import gutao.gt.model.ResponseModel;
import gutao.gt.model.User;
import gutao.gt.services.UserServiceI;



import gutao.gt.util.Encrypt;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController extends BaseController{
    private UserServiceI userservice;
    
	public UserServiceI getUserservice() {
		return userservice;
	}
    @Autowired
	public void setUserservice(UserServiceI userservice) {
		this.userservice = userservice;
	}

	@RequestMapping(value = "index")
	public String helloWorld(Model model){
        System.out.println("首页测试");
		return "index";
	}
	@RequestMapping(value = "tab1")
	public String tab1(Model model){

		return "tab1";
	}
	@RequestMapping(value = "tab2")
	public String tab2(Model model){

		return "tab2";
	}
	@RequestMapping(value = "tab3")
	public String tab3(Model model){

		return "tab3";
	}
	@RequestMapping(value = "formresult")
	@ResponseBody 
	public User resultpage(Model model,User user){
		System.out.println("username = "+user.getName());
		System.out.println("userID = "+user.getId());
		return user;
	}	
	@RequestMapping(value = "username_check",method=RequestMethod.POST)
	public void username_Check(String name, HttpServletResponse response){
		User user = userservice.checkUsername(name);
	    boolean sign = false;
	    if(user == null){
	    	sign = true;
	    }
		writeJson(sign, response);
	}
	@RequestMapping(value = "regist_deal")
	public void Register_deal(Model model,User user,HttpServletResponse response){
		ResponseModel responseModel = new ResponseModel();
		user.setPwd(Encrypt.e(user.getPwd()));
	    int result = userservice.insertUser(user);
		if(result==1){
			responseModel.setSuccess(true);
	    	responseModel.setMsg("注册成功！");
		}else{
			responseModel.setMsg("注册失败！");
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
	@RequestMapping(value = "login_deal",method=RequestMethod.POST)
	public void login_Check(String login_name,String login_pwd, HttpServletResponse response){
		boolean sign = false;
		User user = new User();
		user.setName(login_name);
		user.setPwd(Encrypt.e(login_pwd));
		User u = userservice.checkLogin(user);
		if(u!=null){
			sign = true;
		}
		writeJson(sign, response);
	}
}
