package gutao.gt.services.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.jmx.snmp.Timestamp;

import gutao.gt.dao.QuestionContentMapper;
import gutao.gt.model.QuestionContent;
import gutao.gt.services.QuestionServiceI;
@Service("questionservice")
public class QuestionServiceImpl implements QuestionServiceI {
    private QuestionContentMapper questionContentMapper;
    
	public QuestionContentMapper getQuestionContentMapper() {
		return questionContentMapper;
	}
    @Autowired
	public void setQuestionContentMapper(QuestionContentMapper questionContentMapper) {
		this.questionContentMapper = questionContentMapper;
	}

	@Override
	public int contentSave(QuestionContent content) {
		content.setId(UUID.randomUUID().toString());
		content.setPubnishtime(new Date());
		int result = questionContentMapper.insert(content);
		return result;
	}
	@Override
	public List<QuestionContent> contentShow() {
		List<QuestionContent> list = questionContentMapper.getShow(); 
		return list;
	}

}
