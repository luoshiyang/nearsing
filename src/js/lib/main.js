(function(w){
    var m = {},
        protocol = 'http,',
        ipaddr = '192.168.0.0',
        port = '8000';
        
    m.config = {
		CRY_SERVER_APPID: '6C61B2DF91DFD978', //token
		CRY_API_VERSION: '/V2', //接口版本号
		CRY_API_URL: protocol + '://' + ipaddr + ':' + port, //API接口地址
		CRY_IMGHOST_URL: protocol + '://' + ipaddr + ':' + port + '/v2/app', //图片地址

		CRY_SERVER_TEL: '028-8888888', //客服电话
		CRY_SERVER_NAME: '成都护美科技有限公司' //项目名称
    };
    
    w.$router = {
      news: {
          name: 'news',
          url: './view/news/news.html'
      }  
    }
    /**
     * 获取上级页面传参
     */
    m.GetRequest = function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    /**
     * 打开frame页面
     * @param options.el frame页面挂载点
     * @param options.frmFame frame页面名称
     * @param options.url frame页面url
     * @param options.data 传递的参数
     * @returns null
     * @author lsy
     */
    m.OpenFrm = function(options){
        var el = options.el;
        var frmFame = options.frmFame;
        var url = options.url;
        var data = options.data;
        var pageParam = '';
        for(i in data){
            var key = i;
            var val = data[i];
            pageParam += key + '=' + val + '&';
        }
        var arr = pageParam.split('');
        arr.splice(arr.length-1,1);
        $(el).attr('src',url+'?frmFame='+frmFame+'&url='+url+'&'+arr.join(''));
    }

    /**
	 * /添加毫秒
	 * @param milliseconds
	 * author: uking
	 * @returns {Date}
	 */
	w.Date.prototype.add = function(milliseconds) {
		var m = this.getTime() + milliseconds;
		return new Date(m);
	};
	/**
	 * 添加秒
	 * @param second
	 * author: uking
	 * @returns {Date}
	 */
	w.Date.prototype.addSeconds = function(second) {
		return this.add(second * 1000);
	};
	/**
	 * 添加分钟
	 * @param minute
	 * author: uking
	 * @returns {Date}
	 */
	w.Date.prototype.addMinutes = function(minute) {
		return this.addSeconds(minute * 60);
	};
	/**
	 * 添加小时
	 * @param hour
	 * author: uking
	 * @returns {Date}
	 */
	w.Date.prototype.addHours = function(hour) {
		return this.addMinutes(60 * hour);
	};
	/**
	 * 添加天
	 * @param day
	 * author: uking
	 * @returns {Date}
	 */
	w.Date.prototype.addDays = function(day) {
		return this.addHours(day * 24);
	};
	/**
	 * 增加日期格式化方法
	 * @param fmt
	 * @returns {*}
	 */
	w.Date.prototype.format = function(fmt) { //author: meizz
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(),
			"H+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	/**
	 * 时间戳转时间
	 */
	m.returnDate = function(str){
        var exp = new Date(str);
        exp = exp.format('yyyy-MM-dd hh:mm');
        return exp;
    }
	/**
	 * 返回日期为星期几
	 * @param date
	 * @returns {*}
	 * @constructor
	 */
	m.WeekDay = function(date) {
		var weekday = new Array(7);
		weekday[0] = "星期天";
		weekday[1] = "星期一";
		weekday[2] = "星期二";
		weekday[3] = "星期三";
		weekday[4] = "星期四";
		weekday[5] = "星期五";
		weekday[6] = "星期六";
		return weekday[date.getDay()];
	};
	m.simpleWeekDay = function(date) {
		var weekday = new Array(7);
		weekday[0] = "周日";
		weekday[1] = "周一";
		weekday[2] = "周二";
		weekday[3] = "周三";
		weekday[4] = "周四";
		weekday[5] = "周五";
		weekday[6] = "周六";
		return weekday[date.getDay()];
	};
	m.alert = function(n) {
		var val = alert(JSON.stringify(n));
		return val;
	};
	m.console = function(n) {
		var val = console.log(JSON.stringify(n));
		return val;
	};
	m.nextSiblingElem = function(n) {
		var x = n.nextSibling;
		while(x && x.nodeType != 1) {
			x = x.nextSibling;
		}
		return x;
	}

	$('body').on('click',function(){
		var dropDom = window.parent.document.getElementsByClassName('dropdown');
        var $dropDom = $(dropDom);
        $dropDom.removeClass('open');
    });

    w.$main = m;
})(window)