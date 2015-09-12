package gutao.gt.model;

public class PageModel {
    private int pageAll;
    private int pageNow;
    private int pagesize=4;
    private int limitrow;
    private Object request;
	public int getPageAll() {
		return pageAll;
	}
	public void setPageAll(int pageAll) {
		this.pageAll = pageAll;
	}
	public int getPageNow() {
		return pageNow;
	}
	public void setPageNow(int pageNow) {
		this.pageNow = pageNow;
	}
	public int getPagesize() {
		return pagesize;
	}
	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
	public int getLimitrow() {
		return limitrow;
	}
	public void setLimitrow(int limitrow) {
		this.limitrow = limitrow;
	}
	public Object getRequest() {
		return request;
	}
	public void setRequest(Object request) {
		this.request = request;
	}
    
}
