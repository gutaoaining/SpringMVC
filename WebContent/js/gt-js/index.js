$(function() {
	$("#header_search_button").button({
		label : '查询',
		icons : {
			primary : 'ui-icon-search',
		},
	});
	$("#header_question_button").button({
		label : '提问',
		icons : {
			primary : 'ui-icon-lightbulb',
		},
	}).click(function() {
		if ($.cookie('name')) {
			$("#question").dialog('open');
		} else {
			warmLogin();
		}
	});
	// 隐藏用户和退出的链接
	$("#member, #loginout").hide();
	checkcookie();
	$("#loginout").click(function() {
		$.removeCookie('name');
		window.location.href = '/gutao';
	});
	$.ajax({
		url : 'content_show.html',
		ype : 'POST',
		success : function(responseText, status, xhr) {
			var jsondata = eval(responseText);//这里是解析json数据
			var html = '';
			var arr = [];
			var summary = [];
			$.each(jsondata,function(index, value) {
					html += '<h4>'+ value.username+ '发表于 '+ value.pubnishtime+ '</h4><h3>'+ value.title+ '</h3><div class="editor">'+ value.content + '</div><div class="bottom"><span class="comment" data-id="' + value.id + '" value-count="'+ value.count +'">'+value.count+'条评论</span><span class="up">收起</span></div><hr noshade="noshade" size="1"/><div class="comment_list"></div>';
			});
			$('.content').append(html);
			$.each($('.editor'), function(index, value) {
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0, 200);
				if (summary[index].substring(199, 200) == '<') {
					summary[index]=replacePos(summary[index], 200, '');
				}
				if (summary[index].substring(199, 200) == '</') {
					summary[index]=replacePos(summary[index], 200, '');
					summary[index]=replacePos(summary[index], 199, '');
				}
				if(arr[index].length > 200){
					summary[index]+='...<span class="down">显示全部</span>';
					$(value).html(summary[index]);
				}
				$('.bottom .up').hide();
			});
			$.each($('.editor') , function(index, value){
				$(this).on('click','.down',function(){
					$('.editor').eq(index).html(arr[index]);
					$(this).hide();
					$('.bottom .up').eq(index).show();
				});
			});
			//这种固定的绑定，对动态生成的$('.bottom .up')只起一次作用，再调用就会失效
		    $.each($('.bottom') , function(index, value){
				$(this).on('click','.up',function(){
					$('.editor').eq(index).html(summary[index]);
					$(this).hide();
					$('.editor .down').eq(index).show();
				});
			});
		    
		    $.each($('.bottom') , function(index, value){
		    	$(this).on('click','.comment',function(){
		    		var comment_this = this;
					//alert($(this).html());
		    		if($.cookie('name')){
		    			if(!$('.comment_list').eq(index).has('form').length){
			    				
		    				$.ajax({
			    				url : 'comment_showpage.html',
			    				type : 'POST',
			    				data : {
									titleid : $(comment_this).attr('data-id'),
								},
			    				beforeSend : function(jqXHR, settings){
			    					$('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
			    				},
			    				success : function(responseText){
			    					
			    					$('.comment_list').eq(index).find('.comment_load').hide();
			    					var json_comment= eval(responseText);
			    					var count = 0;
			    					$.each(json_comment , function(index1 , value){
			    					   count = value.countpage;
			    					   $('.comment_list').eq(index).append('<dl class="comment_content"><dt>'+ value.username +'</dt><dd>' + value.commenttext+ '</dd><dd class="date">' + value.date+ '</dd></dl>');
			    					});
			    					
			    					$('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多<span></dd></dl>');
			    					var page = 2;
			    					if(page > count){
			    						$('.comment_list').eq(index).find('.load_more').button().off('click');
			    						$('.comment_list').eq(index).find('.load_more').hide();
			    					}
			    					$('.comment_list').eq(index).find('.load_more').button().on('click', function () {
			    						$('.comment_list').eq(index).find('.load_more').button('disable');
			    					    $.ajax({
			    					    	url : 'comment_showpage.html',
			    					    	type : 'POST',
			    					    	data : {
			    					    		titleid : $(comment_this).attr('data-id'),
			    					    		page : page,
			    					    	},
			    					    	beforeSend : function (jqXHR, settings) {
												$('.comment_list').eq(index).find('.load_more').html('<img src="img/more_load.gif" />');
											},
			    					    	success : function(responseText,status){
			    					    		var loadmore_comment = eval(responseText);
			    					    		$.each(loadmore_comment,function(index2, value){
			    					    			$('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>'+ value.username +'</dt><dd>' + value.commenttext+ '</dd><dd class="date">' + value.date+ '</dd></dl>');
			    					    		});
			    					    		$('.comment_list').eq(index).find('.load_more').button('enable');
			    					    		$('.comment_list').eq(index).find('.load_more').html('加载更多评论');
			    					    		page++;
												if (page > count) {
													$('.comment_list').eq(index).find('.load_more').off('click');
													$('.comment_list').eq(index).find('.load_more').hide();
												}
			    					    	}
			    					    });
			    					});
			    					
			    					$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="commenttext"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') +'"><input type="hidden" name="username" value="'+$.cookie('name')+'"></dd><dd><input type="button" value="发表"></dd></dl></form>');
			    					
			    					$('.comment_list').eq(index).find('input[type=button]').button().click(function(){
					    				//alert(index);
					    				var _this = this;
					    				$('.comment_list').eq(index).find('form').ajaxSubmit({
					    					url : 'comment_add.html',
					    					type : 'POST',
					    					success : function(responseText){
					    						var obj = eval("("+responseText+")");
					    						if(obj.success){
					    							$(_this).button('enable');
					    							$('#loading').css('background','url(img/success.gif) no-repeat 10px center').html('发表成功...').css('height','25');
					    							setTimeout(function() {
					    								var date = new Date();
					    								$('#loading').dialog('close');
					    								$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('name')+ '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd>' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
					    								
					    								$('.content').find('.comment').eq(index).html((parseInt($(comment_this).attr('value-count'))+1)+'条评论');
					    								$('.comment_list').eq(index).find('form').resetForm();
					    								$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
					    								checkcookie();
					    								}, 1000);
					    						}
					    					},
					    					beforeSubmit : function(formData, jqForm,options) {
					    					  $('#loading').dialog('open');
					    			          $(_this).button('disable');
					    					},
					    					
					    				});
					    			});
			    				}
			    			});
			    			
		    			}
		    			if($('.comment_list').eq(index).is(':hidden')){
		    				$('.comment_list').eq(index).show();
		    			}else{
		    			    $('.comment_list').eq(index).hide();	
		    			}
		    			
		    		}else{
		    			warmLogin();//提示未登录的登录后再操作
		    		}
				});
			});
					/*
					 * $.each($('.editor') , function(index, value){ 
					 * arr[index] =$(value).height();//用来存储初始的高度 
					 * if($(value).height() >150){
					 *  $(value).next('.bottom').find('.up').hide();
					 *   }
					 * $(value).height(150);
					 * });
					 * $.each($('.bottom .down') ,function(index ,value){
					 * $(this).click(function(){
					 * $(this).parent().prev().height(arr[index]);
					 * $(this).hide(); $(this).parent().find('.up').show(); 
					 * });
					 * });
					 * 
					 * $.each($('.bottom .up') , function(index ,value){
					 * $(this).click(function(){
					 * $(this).parent().prev().height(150); $(this).hide();
					 * $(this).parent().find('.down').show();
					 * }); 
					 * });
					 */// 这是css样式来处理只显示部分内容的代码，记住要在css中加overflow:hidden
				}
			});
	$('#loading').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 240,
		height : 50,
	}).parent().parent().find('.ui-widget-header').hide();

	$('#error').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 240,
		height : 40,
	}).parent().parent().find('.ui-widget-header').hide();
	$("#reg").dialog({
		title : '会员注册',
		buttons : {
			'注册' : function() {
				if ($("#reg").valid()) {
					$("#birthday").val(getDate($("#birthday").val()));
					$(this).submit();
				} else {
					alert('验证失败');
				}
			}
		},
		autoOpen : false,
		closeText : '关闭',
		width : 430,
		height : 450,
		show : 'slide',
		hide : 'slide',
		draggable : false,
		modal : true,
		resizable : false
	}).buttonset().validate({
	// showErrors : function(errorMap , errorList){
	// var errors = this.numberOfInvalids();
	// if(errors > 0){
	// $('#reg').dialog('option' ,'height' ,errors * 20 +
	// 450);
	// }else{
	// $('#reg').dialog('option' ,'height' ,450);
	// }
	// this.defaultShowErrors();
	// },
	// errorLabelContainer : 'ol.reg_error',
	// wrapper : 'li',
	// debug : true,//打开调试模式
	// 当验证成功后执行
	// 一般用ajax提交
	// success : function(label) {
	// // label.addClass('valid').text("内容合法");
	// label.addClass('valid');
	// },
	submitHandler : function(form) {
		$(form).ajaxSubmit({
			url : 'regist_deal.html',
		    type : 'POST',
			beforeSubmit : function(formData, jqForm,options) {
			$("#loading").dialog('open');
			$('#reg').dialog('widget').find('button').eq(1).button('disable');
			},
			success : function(responseText, status, xhr) {
				        var obj = eval("("+responseText+")");//这里是解析json字符串数据,writeJson()返回的单个数据是json字符串//$.parseJSON(responseText);
						if (obj.success) {
						$.cookie('name', $("#name").val());
						$("#reg").dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(img/success.gif) no-repeat 10px center').html('注册成功...').css('height','25');
						setTimeout(function() {
						$('#loading').dialog('close');
						$('#reg').dialog('close');
						$('#reg').resetForm();
						$('#reg span.star').html('*').removeClass('succ');
						$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('正在加载数据...');
						checkcookie();
					}, 1000);
		            }

	            }
			});
		},
		highlight : function(element, errorclass) {
			$(element).css('border', '1px solid red');
			$(element).parent().find('span')
					.removeClass('succ');
		},// 选中不合法的输入框，边框设置为红色
		unhighlight : function(element, errorclass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;')
					.addClass('succ');
		},// 选中不合法的输入框，边框设置为红色
		rules : {
			name : {
				required : true,
				minlength : 4,
				remote : {
					url : 'username_check.html',
					type : 'POST',
				// 默认的方式是一get方式提交，所以后天用springmvc接收的时候注意一下接收方式要一致
				},
			},
			pwd : {
				required : true,
				rangelength : [ 4, 10 ],
			},
			email : {
				email : true,
			},
			repassword : {
				required : true,
				equalTo : '#pwd',// 验证密码与上面填写的是否一致
			},
			code : {
				required : true,
				code : true,
			},
		},
		messages : {
			name : {
				required : '帐号不能为空！',
				minlength : jQuery.format('长度不少于{0}个字符'),
				remote : '用户名被占用！',
			},
			pwd : {
				required : '密码不能为空！',
				rangelength : jQuery.format('长度在{0}-{1}位间'),
			},
			repassword : {
				required : '不能为空',
				equalTo : '密码不一致',
			},
			code : {
				required : '邮编不能为空',
			},
		}
	});
	$("#login").dialog({
		title : '会员登录',
		buttons : {
			'登录' : function() {
				$(this).submit();
			}
		},
		autoOpen : false,
		closeText : '关闭',
		width : 390,
		height : 240,
		show : 'blind',
		hide : 'blind',
		draggable : false,// 禁止拖拉
		modal : true,// 模式化
		resizable : false
	// 被允许改变大小
	}).validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				url : 'login_deal.html',
				type : 'POST',
				beforeSubmit : function(formData, jqForm,options) {
				$("#loading").dialog('open');
				$('#reg').dialog('widget').find('button').eq(1).button('disable');
			},
			success : function(data) {
					if (data) {
						if ($("#expires").is(':checked')) {
						  $.cookie('name',$("#login_name").val(),{expires : 7,});
						} else {
						  $.cookie('name',$("#login_name").val());
						}
						$("#login").dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(img/success.gif) no-repeat 10px center').html('登录成功...').css('height','25');
						setTimeout(function() {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('正在登录...');
							checkcookie();
							}, 1000);
						}
					}
				});
				},
				highlight : function(element, errorclass) {
					$(element).css('border', '1px solid red');
					$(element).parent().find('span')
							.removeClass('succ');
				},// 选中不合法的输入框，边框设置为红色
				unhighlight : function(element, errorclass) {
					$(element).css('border', '1px solid #ccc');
					$(element).parent().find('span').html('&nbsp;')
							.addClass('succ');
				},// 选中不合法的输入框，边框设置为红色
				rules : {
					login_name : {
						required : true,
					},
					login_pwd : {
						required : true,
						minlength : 4,
						remote : {
							url : 'login_deal.html',
							type : 'POST',
							data : {
								login_name : function() {
									return $('#login_name').val();
								},
							},
						},
					},
				},
				messages : {
					login_name : {
						required : '帐号不能为空！',
					},
					login_pwd : {
						required : '密码不能为空！',
						remote : '账号或密码不正确',
					},
				}
	});
	$("#question").dialog({
			title : '提问',
			buttons : {
			'发布' : function() {
			$(this).ajaxSubmit({
				url : 'add_content.html',
				type : 'POST',
				data : {
					username : $.cookie('name'),
					content : UE.getEditor('editor').getPlainTxt(),
				},
				beforeSubmit : function(formData, jqForm,options) {
				$('#loading').dialog('open');
				$('#question').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function(responseText,statusText) {
						if (responseText) {
						 $('#question').dialog('widget').find('button').eq(1).button('enable');
						 $('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('发布成功...');
						 setTimeout(function() {
							 $('#loading').dialog('close');
							 $('#question').dialog('close');
							 $('#question').resetForm();
							 $('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('提交中...');
							 }, 1000);
						}
						},
					});
					}
				},
				autoOpen : false,
				closeText : '关闭',
				width : 500,
				height : 400,
				modal : true,// 模式化
				resizable : false,// 被允许改变大小
	});
	UE.getEditor('editor');
	// $('.uEditorCustom').uEditor();
	$("#reg_a").click(function() {
		$("#reg").dialog('open');
	});
	$("#login_a").click(function() {
		$("#login").dialog('open');
	});

	$('[title]').tooltip({
		show : false,
		hide : false,
		position : {
			my : 'left center',
			at : 'right+5 center'
		}
	});
	$('#email').autocomplete(
			{
				delay : 0,
				autoFocus : true,
				source : function(request, response) {
					var hosts = [ 'qq.com', '126.com', '163.com', 'gmail.com',
							'sina.com.cn' ];
					// alert(request.term);//打印出输入的内容
					term = request.term;
					name = term;
					host = '';
					ix = term.indexOf('@');
					result = [];
					if (ix > -1) {
						name = term.slice(0, ix);
						host = term.slice(ix + 1);
					}
					result.push(term);
					var resulthost = [];
					if (name) {
						var findedHosts = (host ? $.grep(hosts, function(value,
								index) {
							return value.indexOf(host) > -1;
						}) : hosts);
						// 如果用户已经输入的域名，则提示相关域名，如果还没输入则全部提示
						resulthost = $.map(findedHosts, function(value, index) {
							return name + '@' + value;
						});
						result = result.concat(resulthost);
					}
					response(result);
				}
			});

	$('#birthday').datepicker({
		showWeek : true,
		weekHeader : '周',
		FirstDay : 1,
		changeMonth : true,
		changeYear : true,
		// showButtonPanel : true,
		// closeText : '关闭',
		// currentText : '今天',
		maxDate : 0,// 最多可以选择后面几天
		hideIfNoPreNext : true,
		showAnim : true,
		duration : 1000,
		showAnim : 'slide',
		yearRange : '1900 : 2050',
		beforeShowDay : function(date) {
			if (date.getDate() == 1) {
				return [ false, 'a', '不能选中' ];
			} else {
				return [ true ];
			}
		},
	});
	$.validator.addMethod('code', function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, '请输入正确的邮政编码！');
	// tabs标签框的设置
	$("#tabs").tabs({
	// collapsible : true,
	// disabled: true,
	// event : 'mouseover',
	// active : 1,
	// active :false,
	// heightStyle : 'content',
	// heightStyle : 'fill',
	// create : function(event,ui){
	// alert($(ui.tab.get()).html());
	// }
	// activate : function(event,ui){
	// alert($(ui.newTab.get()).html());
	// alert($(ui.oldTab.get()).html());
	// alert($(ui.newPanel.get()).html());
	// alert($(ui.oldPanel.get()).html());
	// }
	// load : function(event , ui){
	// //alert("ajxa远程加载文档后触发");
	//			
	// },
	// beforeLoad : function(event , ui){
	// ajxa加载之前完成，返回内容，在beforeLoad中使用，在load中使用会导致之前的tab失效
	// ui.jqXHR.success(function(responseText){
	// alert(responseText);
	//			
	// });
	// ui.ajaxSettings.url = 'tab1.html';
	// }
	});
	$("#accordion").accordion({
		collapsible : true,
		header : 'h3',
		icons : {
			"header" : "ui-icon-plus",
			"activeHeader" : "ui-icon-minus",
		},
	});

});
function checkcookie() {
	if ($.cookie('name')) {
		$("#member, #loginout").show();
		$("#login_a, #reg_a").hide();
		$("#member").html($.cookie('name'));
	} else {
		$("#login_a, #reg_a").show();
		$("#member, #loginout").hide();
	}
}
function getDate(strDate) {
	// 将字符串格式化为date类型再传到后台
	var date = eval('new Date('
			+ strDate.replace(/\d+(?=-[^-]+$)/, function(a) {
				return parseInt(a, 10) - 1;
			}).match(/\d+/g) + ')');
	return date;

}
function replacePos(strObj, pos, replaceText){
	return str.Obj.substr(0,pos-1) + replaceText + strObj.substring(pos, strObj.length);
}
function warmLogin(){
	$("#error").dialog('open');
	setTimeout(function() {
		$("#error").dialog('close');
		$("#login").dialog('open');
	}, 1000);
}