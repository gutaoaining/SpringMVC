$(function(){
	$("#commit").click(function(){
		$.ajax({
			type : "post",
			url : 'formresult.html',
			data: $("#userform").serialize(),//序列化表单
			dataType : 'json',
			success : function(data){
				var obj = eval(data);
				$("#box").html(obj.name+","+obj.id);
			}
		});
	
	
	});
//	$('form input[name=sex]').click(function(){
//		$('#box').html(decodeURIComponent($(this).serialize()));
//		//serialize()会自动对数据进行一个编码
//		//decodeURIComponent解码
//	});
//	$('form input[name=sex]').click(function(){
//		$('#box').html(decodeURIComponent($(this).serialize()));
//		//serialize()会自动对数据进行一个编码
//		//decodeURIComponent解码
//	});
	//以json方式
//	$('form input[name=sex]').click(function(){
//		var json = $(this).serializeArray();
//		$('#box').html(json[0].name+" = "+json[0].value);
//	});
	//对沟通的参数进行初始化
//	$.ajaxSetup({
//		type : "post",
//		url : 'formresult.html',
//	});
//	$("#commit").click(function(){
//		$.ajax({
//			data: $("#userform").serialize(),//序列化表单
//			success : function(data){
//				var obj = eval(data);
//				$("#box").html(obj.username+","+obj.age);
//			}
//		});
//	});
//	$("#commit").click(function(){
//		$.ajax({
//			type : "post",
//			url : 'formresult.html',
//			data: $.param({name:'gutao',id:'12'}),
//			success : function(data){
//				var obj = eval(data);
//				$("#box").html(obj.username+","+obj.age);
//			}
//		});
//	});
	//下面构成了两种ajax对应事件的形式上面是键值对，下面是绑定在document的上连缀
//	$("#commit").click(function(){
//	$.ajax({
//		type : "post",
//		url : 'http://www.sdfigsdf.com/index.php',
//		data: $("#userform").serialize(),//序列化表单
//		success : function(data){
//			var obj = eval(data);
//			$("#box").html(obj.username+","+obj.age);
//		},
//		complete : function(){
//			alert("请求完成之后，不管是否成功");
//		},
//		beforeSend : function(){
//			alert("发送请求之前");
//		},
//		error:function(){
//			alert("请求失败后");
//		}
//	   // timeout:3000
//		//global:false//消除全局影响
//		
//	});
//	});
//	$(document).ajaxStart(function(){
//		$('.load').show();
//	}).ajaxStop(function(){
//		$('.load').hide();
//	}).ajaxSend(function(){
//		alert("发送请求之前");
//	}).ajaxComplete(function(){
//		alert("请求完成之后，不管是否成功");
//	}).ajaxSuccess(function(){
//		alert("请求成功后");
//	}).ajaxError(function(){
//		alert("请求失败后");
//	});
//	var jqXhr = $.ajax('formresult.html');
//	var jqXhr1 = $.ajax('formresult.html');
//	$.when(jqXhr,jqXhr1).done(function(data1,data2){
//		  var obj1 = eval(data1);
//		  var obj2 = eval(data2);
//		  alert("这是"+obj1[0].username+","+obj1[0].age);
//		  alert("这是"+obj2[0].username+","+obj2[0].age);
//	});
});