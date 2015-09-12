<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!--[if lt IE 8]><script>window.location.href="/gutao/resend.html"</script><![endif]-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>淘知首页</title>
<jsp:include page="../../init.jsp"></jsp:include>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js//gt-js/index.js"></script>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/gt-css/index.css">
</head>
<body>
	<div id="header">
		<div class="header_main">
			<h1>淘知</h1>
			<div class="header_search">
				<input type="text" name="search" class="search" />
			</div>
			<div class="header_button">
				<button id="header_search_button"></button>
				<button id="header_question_button"></button>
			</div>
			<div class="header_member">
				<a href="javascript:void(0)" id="login_a">登录</a> <a
					href="javascript:void(0)" id="member">用户</a> | <a
					href="javascript:void(0)" id="reg_a">注册</a> <a
					href="javascript:void(0)" id="loginout">退出</a>
			</div>
		</div>
	</div>
	<div id="main">
		<div class="main_left">
			<div id="tabs">
				<ul>
					<li><a href="tab1.html">最热门的问题</a></li>
					<li><a href="tab2.html">小编推荐的问题</a></li>
					<li><a href="tab3.html">评论最多的问题</a></li>
				</ul>
			</div>
			<div class="content">
			</div>
		</div>
		<div class="main_right">
			<div id="accordion">
				<h3>我关注的人</h3>
				<div>
					<p>内容1</p>
					<p>内容1</p>
				</div>
				<h3>关注我的人</h3>
				<div>内容2</div>
				<h3>我的提问列表</h3>
				<div>内容3</div>
			</div>
		</div>
	</div>
	<form id="reg" title="注册表单">
		<ol class="reg_error"></ol>
		<p>
			<label for="username">帐户:</label> <input type="text" name="name"
				class="text" id="name" /> <span class="star">*</span>
		</p>
		<p>
			<label for="password">密码:</label> <input type="password" name="pwd"
				class="text" id="pwd" /> <span class="star">*</span>
		</p>
		<p>
			<label for="password">重复密码:</label> <input type="password"
				name="repassword" class="text" id="repassword" /> <span
				class="star">*</span>
		</p>
		<p>
			<label for="email">邮箱:</label> <input type="text" name="email"
				id="email" class="text" /> <span class="star">*</span>
		</p>
		<p>
			<label>性别:</label> <input type="radio" name="sex" value="male"
				id="male" checked="checked"><label for="male">男</label></input><input
				type="radio" name="sex" value="female" id="female"><label
				for="female">女</label></input>
		</p>
		<p>
			<label for="date">生日:</label> <input type="text" name="birthday"
				class="text" id="birthday" readonly="readonly"></input>
		</p>
		<p>
			<label for="code">邮编:</label> <input type="text" name="code"
				class="text" id="code"></input> <span class="star">*</span>
		</p>
	</form>
	<form id="login" title="会员登录">
		<p>
			<label for="loginname">帐户:</label> <input type="text"
				name="login_name" class="text" id="login_name" /> <span
				class="star">*</span>
		</p>
		<p>
			<label for="loginpassword">密码:</label> <input type="password"
				name="login_pwd" class="text" id="login_pwd" /> <span class="star">*</span>
		</p>
		<p>
			<input type="checkbox" checked="checked" id="expires" /> <label
				for="password">登录后一周内有效</label>
		</p>
	</form>
	<form id="question">
		<p>
			<label for="title">问题名称：</label> <input type="text" name="title"
				style="width: 390px;" class="text" id="title" />
		</p>
		<p>
		    <label for="title">请输入问题描述：</label>
			<script id="editor" type="text/plain" style="width:470px;height:130px;"></script>
		</p>
	</form>
	<div id="loading">正在加载数据...</div>
	<div id="error">请登录后操作...</div>
	<div id="footer">gutaoainibei | http://github.com/gutaoainibei</div>
</body>
</html>