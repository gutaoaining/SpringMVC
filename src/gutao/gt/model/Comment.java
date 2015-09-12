package gutao.gt.model;

import java.util.Date;

public class Comment {
	private double countpage;
	
	
    public double getCountpage() {
		return countpage;
	}

	public void setCountpage(double countpage) {
		this.countpage = countpage;
	}

	private String id;

    private String username;

    private String titleid;

    private Date date;

    private String commenttext;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getTitleid() {
        return titleid;
    }

    public void setTitleid(String titleid) {
        this.titleid = titleid == null ? null : titleid.trim();
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCommenttext() {
        return commenttext;
    }

    public void setCommenttext(String commenttext) {
        this.commenttext = commenttext == null ? null : commenttext.trim();
    }
}