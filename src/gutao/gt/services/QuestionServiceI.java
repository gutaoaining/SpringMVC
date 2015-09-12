package gutao.gt.services;

import java.util.List;

import gutao.gt.model.QuestionContent;

public interface QuestionServiceI {
   public int contentSave(QuestionContent content);
   
   public List<QuestionContent> contentShow();
}
