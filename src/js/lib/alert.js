(function(){
	function hide(){
		$(".alert").fadeOut()
	}
	// title代表提示头部加粗显示  con为提示内容 position为定位方式(left,center,right) time为提示框几秒后消失
	$.extend({
		alert:{
			init: function(opt,func){
				clearTimeout(this.timer);
				this.options = {};
				this.options.type = 'success';
				this.options.text = '成功';
				this.options.position = 'center';
				this.options.duration = 2000;
				for(i in opt){
					this.options[i] = opt[i];
				}
				func();
			},
			show: function(opt){
				var _this = this;
				this.init(opt,function(){
					//判断dom是否存在
					_this.wrapper = document.querySelector('.alert');
					
					if(_this.wrapper){	//存在
						//初始化dom
						_this.wrapper.classList = '';
						_this.wrapper.innerHTML = '';
					}else{	//不存在
						var tag = document.body;
						var wrapper = document.createElement('div');
						_this.wrapper = wrapper;
						_this.wrapper.setAttribute('role','alert');
						tag.appendChild(_this.wrapper);
					}

					if(_this.options.type === 'success'){
						_this.wrapper.classList = 'alert alert-success alert-center';
						
					}else if(_this.options.type === 'error'){
						_this.wrapper.classList = 'alert alert-danger alert-center';
					}

					//加载dom
					var html = "<strong>"+_this.options.type+"</strong>"+_this.options.text;
					_this.wrapper.innerHTML = html;
					_this.wrapper.classList.add('alert-show');

					//定时器
					_this.timer = setTimeout(function(){
						_this.hide();
					},1000);
				});
			},
			hide:function(){
				this.wrapper.classList.add('alert-hide');
				this.wrapper.classList.remove('alert-show');
			}
		},
		//成功警告框
		// success:function(title,con,position,time){
		// 	var html;
		// 	$(".alert").remove();
		// 	html = "<div class='alert alert-success hide alert-center' role='alert'>"
		// 					+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 					+"<strong>"
		// 					+title
		// 					+"</strong>"
		// 					+con
		// 				+"</div>";
		// 	$("body").prepend(html);

		// 	setTimeout(hide,2000)
		// },
		// //info警告框
		// info:function(title,con,position,time){
		// 	var html;
		// 	$(".alert").remove()
		// 	switch (position){
		// 		case "center":
		// 			html = "<div class='alert alert-info alert-center' role='alert'>"
		// 				+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"		
		// 				+"<strong>"
		// 				+title
		// 				+"</strong>"
		// 				+con
		// 			+"</div>"
		// 			break;
		// 		// case "left":
		// 		// 	html = "<div class='alert alert-info alert-left' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"	
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// case "right":
		// 		// 	html = "<div class='alert alert-info alert-right' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// default:
		// 		// 	break;
		// 	}
		// 	$("body").prepend(html)
		// 	setTimeout(hide,time)
		// },
		// //黄色警告框
		// warning:function(title,con,position,time){
		// 	var html;
		// 	$(".alert").remove()
		// 	switch (position){
		// 		case "center":
		// 			html = "<div class='alert alert-warning alert-center' role='alert'>"
		// 				+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 				+"<strong>"
		// 				+title
		// 				+"</strong>"
		// 				+con
		// 			+"</div>"
		// 			break;
		// 		// case "left":
		// 		// 	html = "<div class='alert alert-warning alert-left' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// case "right":
		// 		// 	html = "<div class='alert alert-warning alert-right' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// default:
		// 		// 	break;
		// 	}
		// 	$("body").prepend(html)
		// 	setTimeout(hide,time)
		// },
		// //红色警告框
		// danger:function(title,con,position,time){
		// 	var html;
		// 	$(".alert").remove()
		// 	switch (position){
		// 		case "center":
		// 			html = "<div class='alert alert-danger alert-center' role='alert'>"
		// 					+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 					+"<strong>"
		// 					+title
		// 					+"</strong>"
		// 					+con
		// 				+"</div>"
		// 			break;
		// 		// case "left":
		// 		// 	html = "<div class='alert alert-danger alert-left' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// case "right":
		// 		// 	html = "<div class='alert alert-danger alert-right' role='alert'>"
		// 		// 		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
		// 		// 		+"<strong>"
		// 		// 		+title
		// 		// 		+"</strong>"
		// 		// 		+con
		// 		// 	+"</div>"
		// 		// 	break;
		// 		// default:
		// 		// 	break;
		// 	}
		// 	$("body").prepend(html);
		// 	setTimeout(hide,time)
		// }
	})
})(window)