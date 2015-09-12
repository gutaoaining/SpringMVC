package gutao.gt.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @author nibei
 * @time2015年9月1日
 */
@Controller
public class RequestResendController {
     @RequestMapping(value ="resend",method=RequestMethod.GET)
     public String error(){
    	 System.out.println("获取到了请求！！！！！！！！！！");
    	 return "error";
     }
}
