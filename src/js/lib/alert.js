(function(w){
	function hide(){
		$(".alert").fadeOut()
	}
	var m = {};
	// title代表提示头部加粗显示  con为提示内容 position为定位方式(left,center,right) time为提示框几秒后消失
	m.init = function(opt,func){
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
	};
	m.show = function(opt){
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
	};
	m.hide = function(){
		this.wrapper.classList.add('alert-hide');
		this.wrapper.classList.remove('alert-show');
	}
	w.$alert = m;
})(window)