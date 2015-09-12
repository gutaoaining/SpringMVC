package gutao.gt.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
@Controller
public class BaseController {
public void writeJson(Object obj,HttpServletResponse response){
		
		try {
			
			String json=JSON.toJSONStringWithDateFormat(obj,"yyyy-MM-dd HH:mm:ss");
		    response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(json);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
