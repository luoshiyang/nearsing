(function(){
	function hide(){
		$(".alert").fadeOut()
	}
	// title代表提示头部加粗显示  con为提示内容 position为定位方式(left,center,right) time为提示框几秒后消失
	$.extend({
		//成功警告框
		success:function(title,con,position,time){
			var html;
			$(".alert").remove()
			switch (position){
				case "center":
					html = "<div class='alert alert-success alert-center' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "left":
					html = "<div class='alert alert-success alert-left' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "right":
					html = "<div class='alert alert-success alert-right' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				default:
					break;
			}
			$("body").prepend(html)
			setTimeout(hide,2000)
		},
		//info警告框
		info:function(title,con,position,time){
			var html;
			$(".alert").remove()
			switch (position){
				case "center":
					html = "<div class='alert alert-info alert-center' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"		
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "left":
					html = "<div class='alert alert-info alert-left' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"	
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "right":
					html = "<div class='alert alert-info alert-right' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				default:
					break;
			}
			$("body").prepend(html)
			setTimeout(hide,time)
		},
		//黄色警告框
		warning:function(title,con,position,time){
			var html;
			$(".alert").remove()
			switch (position){
				case "center":
					html = "<div class='alert alert-warning alert-center' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "left":
					html = "<div class='alert alert-warning alert-left' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "right":
					html = "<div class='alert alert-warning alert-right' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				default:
					break;
			}
			$("body").prepend(html)
			setTimeout(hide,time)
		},
		//红色警告框
		danger:function(title,con,position,time){
			var html;
			$(".alert").remove()
			switch (position){
				case "center":
					html = "<div class='alert alert-danger alert-center' role='alert'>"
							+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
							+"<strong>"
							+title
							+"</strong>"
							+con
						+"</div>"
					break;
				case "left":
					html = "<div class='alert alert-danger alert-left' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				case "right":
					html = "<div class='alert alert-danger alert-right' role='alert'>"
						+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
						+"<strong>"
						+title
						+"</strong>"
						+con
					+"</div>"
					break;
				default:
					break;
			}
			$("body").prepend(html);
			setTimeout(hide,time)
		}
	})
})(window)