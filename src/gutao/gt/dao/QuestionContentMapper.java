package gutao.gt.dao;

import java.util.List;

import gutao.gt.model.QuestionContent;

public interface QuestionContentMapper {
    int deleteByPrimaryKey(String id);

    int insert(QuestionContent record);

    int insertSelective(QuestionContent record);

    QuestionContent selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(QuestionContent record);

    int updateByPrimaryKeyWithBLOBs(QuestionContent record);

    int updateByPrimaryKey(QuestionContent record);
    
    List<QuestionContent> getShow();
}