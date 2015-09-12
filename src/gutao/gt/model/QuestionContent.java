package gutao.gt.model;

import java.util.Date;

public class QuestionContent {
	private int count;
	
    public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	private String id;

    private String title;

    private String username;

    private Date pubnishtime;

    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Date getPubnishtime() {
        return pubnishtime;
    }

    public void setPubnishtime(Date pubnishtime) {
        this.pubnishtime = pubnishtime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}