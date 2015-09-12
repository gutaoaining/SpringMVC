<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>表单提交页面</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/gt-js/form.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/gt-css/my.css">
</head>
<body>
<!-- id="userform"  action="formresult.html" -->
<form  id="userform" method="post">
<input type="text" name="name" value="nibei"/>
<input type="text" name="id" value="21"/>
<input type="button" id="commit" value="提交">
</form>
<span class="load">正在加载中.....</span>
<div id="box"></div>
</body>
</html>