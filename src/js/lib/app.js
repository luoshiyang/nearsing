/**
 * Created by uking on 2016/5/29.
 */
(function(w) {
	"use strict";
	var m = {},
		keyBackCount = 0,
		base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

		protocol = "http",
		// ipaddr = '119.23.57.158', //4.6测试
		// port = '8084'; //4.6测试
		// ipaddr = '192.168.1.250', //赵冠历
		// port = '8088';
		ipaddr = '47.106.109.241', //测试地址
		port = '8083';


	m.config = {
		CRY_SERVER_APPID: '6C61B2DF91DFD978', //token
		CRY_API_VERSION: '/V2', //接口版本号
		CRY_API_URL: protocol + '://' + ipaddr + ':' + port, //API接口地址
		CRY_IMGHOST_URL: protocol + '://' + ipaddr + ':' + port + '/v2/app', //图片地址

		CRY_SERVER_TEL: '028-62695608', //客服电话
		CRY_SERVER_NAME: '车如云租车' //app名称
	};
	m.immersiveFlag = true; //是否开启沉浸式
	m.headerPos = {
		x: 0,
		y: 0,
		w: 0,
		h: 48
	};
	/**
	 * 让伪类:active生效 用于点击效果
	 */
	w.document.body.addEventListener('touchstart', function() {}, false);
	//w.document['domain']='localhost';

	/**
	 * apiready
	 * @param callback
	 */
	m.ready = function(callback) {
		w.onload = function() {
			w.apiready = function() {
				api.parseTapmode();
				var header = document.getElementById('header');
				if(header) {
					m.immersiveFlag && m.fixStatusBar(header);
					m.headerPos = m.offset(header);
					var bo = m.nextSiblingElem(header);
					bo.style.marginTop = (m.headerPos.h + parseInt(getComputedStyle(bo, false).marginTop)) + 'px';
				}
				callback && callback();
			}
		}
	};

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
	/**
	 * 打开win
	 * @param options
	 * @author uking
	 * @constructor
	 */
	m.OpenWindow = function(options) {
		var isoFlag = api.systemType === 'ios',
			delay = isoFlag && !options['delay'] ? 0 : 200;
		if(!options) return;
		options['delay'] = delay;
		//options['header']={"Access-Control-Allow-Origin":'*'};
		//options.useWKWebView = isoFlag && api.systemVersion >= 8;
		options.slidBackEnabled = false;
		options.bounces = false;
		api.openWin(options);
	};
	/**
	 * 打开frame
	 * @param options
	 * @author uking
	 * @constructor
	 */
	m.OpenFrame = function(options) {
		var isoFlag = api.systemType === 'ios';
		//options['header']={"Access-Control-Allow-Origin":'*'};
		//options.useWKWebView = isoFlag && api.systemVersion >= 8;
		api.openFrame(options);
		options.bounces = false;
	};
	/**
	 * 打开framegroup
	 * @param options
	 * @param callback
	 * @author uking
	 * @constructor
	 */
	m.OpenFrameGroup = function(options, callback) {
		var isoFlag = api.systemType === 'ios';
		if(!options || m.isEmptyObject(options)) return;
		//options['header']={"Access-Control-Allow-Origin":'*'};
		/*        options.frames.forEach(function (frame) {
		            frame.useWKWebView = isoFlag && api.systemVersion >= 8;
		        });*/
		api.openFrameGroup(options, function(ret, err) {
			callback(ret, err);
		});
	};
	/**
	 * ajax请求
	 * @author uking
	 * @param options
	 */
	m.ajax = function(options) {
		options['copyData'] = options['data'];
		if(api.connectionType == 'none') {
			m.toast('网络状态不佳，请稍后重试！');
			return;
		}
		if(!(options['url'] && options['success'])) return;
		if(options['progress']) {
			m.OpenFrame({
				name: 'idFrmProgress',
				url: 'widget://html/common/cry_common_loader.html',
				bgColor: 'rgba(255,255,255,0.2)'
			});
		}

		var errorFun = options['error'],
			successFun = options['success'],
			progress = options['progress'],
			data = options['data'] || {},
			ele, action = options['action'],
			tFlag = options['tFlag'],
			keyback = options['keyback'];
		var loginParam = {
			action: action,
			keyback: keyback
		};
		options['data'] = {};
		if(options['element']) {
			ele = document.getElementById(options['element']);
			ele.setAttribute('disabled', 'disabled');
			delete options['element'];
		}
		delete options['action'];
		delete options['tFlag'];
		delete options['error'];
		delete options['success'];
		delete options['progress'];
		if(options['copyData']['cry_token']) {
			var cry_token = options['copyData']['cry_token'];
			options['headers'] = {
				"cry_token": cry_token,
				"device_id": api.deviceId,
				'Content-Type': 'application/json;charset=utf-8'
			}
		} else {
			options['headers'] = {
				device_id: api.deviceId,
				'Content-Type': 'application/json;charset=utf-8 '
			}
		}
		options['method'] = options['type'] || 'get';
		options['timeout'] = options['timeout'] || 5000;
		options['dataType'] = options['dataType'] || 'json';
		options['returnAll'] = options['returnAll'] || false;
		options['cache'] = false;
		options['data']['body'] = data;
		options['data']['files'] = options['file'] || {};
		// console.log(options.url+'=URL='+JSON.stringify(options));
		api.ajax(options, function(ret, err) {
			progress && api.closeFrame({
				name: 'idFrmProgress'
			});
			if(ele) {
				ele.removeAttribute('disabled');
			}
			if(ret) {
				// console.log('RET'+JSON.stringify(ret));
				if(!ret.success && ret.needLogin) {
					if(m.getUser()) {
						m.SendEvent('stopLocation');
						m.removeStorage('user');
						api.alert({
							title: '提示消息',
							msg: '登录已失效，请重新登录',
						}, function(ret, err) {
							m.login(loginParam);
						});
					}
					//                  m.login(loginParam);
				} else {
					if(typeof successFun == 'function') {
						successFun(ret);
					}
				}
			} else {
				// console.log('ERR'+JSON.stringify(err));
				errorFun && typeof(errorFun) == 'function' ? errorFun(err) : m.toast(err.body.message);
			}
		});
	};
	/**
	 * AjaxByToken
	 * @param options flag为是否需要传TOKEN
	 * @constructor
	 */
	m.AjaxByToken = function(options) {
		var token = null,
			action = options['action'],
			keyback = !!options['keyback'];
		var loginParam = {
			action: action,
			keyback: keyback
		};
		if(!(options['url'] && options['success'])) return;
		options['url'] = m.config.CRY_API_URL + options['url'];
		options['data'] = options['data'] || {};
		options['data']['appid'] = m.config.CRY_SERVER_APPID;
		if(options['flag']) {
			var user = m.getUser();
			if(user) {
				m.param(options['data'], {
					'cry_token': user['token'],
					//                  'appid': m.config.CRY_SERVER_APPID,
					'device_id': api.deviceId
				});
				m.ajax(options);
			} else {
				m.login(loginParam);
			}
		} else {
			m.ajax(options);
		}

	};
	/**
	 * 打开登录窗体
	 */
	m.openLoginWin = function(param) {
		// m.OpenWindow({
		// 	name: 'idWinLogin',
		// 	url: 'widget://html/login/login.html',
		// 	pageParam: param,
		// 	softInputMode: 'pan'
		// });
		api.openWin({
            name: $r.signIn.name,
            url: $r.signWin.url,
            bounces: false,
            slidBackEnabled:false,
            pageParam: {
                title: '登录',
                data: {
                    frmName: $r.signIn.name,
                    frmUrl: $r.signIn.url,
                    bounces: false
                }
            }
        });
	};

	m.setTimeout = function(fun, delay) {
		if(typeof fun == 'function') {
			var argu = Array.prototype.slice.call(arguments, 2);
			var f = (function() {
				fun.apply(null, argu);
			});
			return window.setTimeout(f, delay);
		}
		return window.setTimeout(fun, delay);
	};
	m.login = function(param) {
		m.setTimeout(function() {
			m.openLoginWin(param);
		}, 500, param);
	};
	/**
	 * 监听安卓物理返回键
	 * 按两次退出
	 */
	m.keyback = function() {
		if(api.systemType == 'android') {
			api.addEventListener({
				name: 'keyback'
			}, function(ret, err) {
				if(!keyBackCount) {
					api.alert({
						title: '车如云租车-提示',
						msg: '再按一次退出'
					}, function(ret, err) {
						keyBackCount++;
						setTimeout(function() {
							keyBackCount = 0;
						}, 3000);
					});
				} else {
					api.closeWidget({
						id: api.appId,
						silent: true,
						animation: {
							type: 'none'
						}
					});
				}
			});
		}
	};
	/**
	 * 禁止keyback键
	 */
	m.stopKeyback = function(callback) {
		if(api.systemType == 'android') {
			api.addEventListener({
				name: 'keyback'
			}, function(ret, err) {
				if(callback) {
					callback();
				} else {
					return false;
				}
			});
		}
	};

	m.toast = function(msg, time) {
		api.toast({
			msg: msg,
			duration: time || 3000,
			location: 'bottom'
		});
	};

	/*by king*/
	m.isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	};
	m.fixIos7Bar = function(el) {
		if(!m.isElement(el)) {
			console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
			return;
		}
		var strDM = api.systemType;
		if(strDM == 'ios') {
			var strSV = api.systemVersion;
			var numSV = parseInt(strSV, 10);
			var fullScreen = api.fullScreen;
			var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
			if(numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
				el.style.paddingTop = '20px';
			}
		}
	};
	m.fixStatusBar = function(el) {
		if(!m.isElement(el)) {
			console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
			return;
		}
		var sysType = api.systemType;
		if(sysType == 'ios') {
			m.fixIos7Bar(el);
		} else if(sysType == 'android') {
			var ver = api.systemVersion;
			ver = parseFloat(ver);
			if(ver >= 4.4) {
				var statusBar = api.require("statusBar");
				el.style.paddingTop = statusBar.getStatusBarHeight() + 'px';
			}
		}
	};
	m.offset = function(el) {
		if(!m.isElement(el)) {
			console.warn('$api.offset Function need el param, el param must be DOM Element');
			return;
		}
		var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

		var rect = el.getBoundingClientRect();
		return {
			l: rect.left + sl,
			t: rect.top + st,
			w: el.offsetWidth,
			h: el.offsetHeight
		};
	};
	/**
	 * 发送监听事件
	 * @param name  事件名
	 * @param extra 传参
	 * @constructor
	 */
	m.SendEvent = function(name, extra) {
		api.sendEvent({
			name: name,
			extra: extra
		});
	};

	/**
	 * 监听消息事件
	 * @param name  事件名
	 * @param extra 传参
	 * @constructor
	 */
	m.AddEvent = function(name, callback) {
		api.addEventListener({
			name: name
		}, function(ret, err) {
			callback(ret, err)
		});
	};

	/**
	 * base64 编码
	 * @param s
	 * @returns {*}
	 */
	m.base64Encode = function(s) {
		if(!s) {
			return;
		}
		s += '';
		if(s.length === 0) {
			return s;
		}
		var i, b, x = [],
			map = base64map,
			padchar = map[64];
		var len = s.length - s.length % 3;

		for(i = 0; i < len; i += 3) {
			b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8) | s.charCodeAt(i + 2);
			x.push(map.charAt(b >> 18));
			x.push(map.charAt((b >> 12) & 0x3f));
			x.push(map.charAt((b >> 6) & 0x3f));
			x.push(map.charAt(b & 0x3f));
		}

		switch(s.length - len) {
			case 1:
				b = s.charCodeAt(i) << 16;
				x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
				break;
			case 2:
				b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
				x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
				break;
		}
		return x.join('');
	};
	/**
	 * 对象合并
	 * @param o
	 * @param n
	 * @returns {*}
	 */
	m.param = function(o, n) {
		for(var p in n) {
			if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p)))
				o[p] = n[p];
		}
		return o;
	};
	/**
	 * 图片路径
	 * @param imgurl
	 * @constructor
	 * @return {string}
	 */
	m.imgPath = function(imgurl) {
		return imgurl && imgurl != '' ? m.config.CRY_IMGHOST_URL + '/upload/' + imgurl : '';
	};
	/**
	 * 存储USER信息
	 * @param user
	 * @author uking
	 */
	m.setUser = function(user) {
		if(user) localStorage.setItem('user', JSON.stringify(user))
	};
	/**
	 * 获取USER信息
	 * @returns {undefined}
	 * @author uking
	 */
	m.getUser = function() {
		try {
			var user = localStorage.getItem('user');
			return user ? JSON.parse(user) : undefined;
		} catch(e) {
			// localStorage.clear();
			return undefined;
		}
	};
	/**
	 * 删除localStorage key
	 * @param key
	 * @author uking
	 */
	m.removeStorage = function(key) {
		localStorage.removeItem(key);
	};
	/**
	 * 存储城市历史选择记录
	 * @param user
	 * @author uking
	 */
	m.setHistoryCity = function(cityinfo) {
		var historycitys = JSON.parse(localStorage.getItem('citys') || '[]');
		for(var i = 0; i < 3; i++) {
			if(historycitys[i] && historycitys[i].city == cityinfo.city) return false;
		}
		historycitys.unshift(cityinfo);
		if(historycitys.length > 3) historycitys.pop();
		localStorage.setItem('citys', JSON.stringify(historycitys))
	};
	/**
	 *图片上传
	 */
	m.uploadImage = function(path, file, success, errorFun) {
		api.openFrame({
			name: $r.cryCommonLoader.name,
			url: $r.cryCommonLoader.url,
		})
		var user = $App.getUser();
		api.ajax({
			url: m.config.CRY_API_URL + '/v2/app/member/' + path,
			method: 'post',
			headers: {
				"device_id": api.deviceId,
				"cry_token": user.token
			},
			data: {
				values: {
					"device_id": api.deviceId,
					"cry_token": user.token,
				},
				files: {
					base64Str: file
				}
			}
		}, function(ret, err) {
			if(ret) {
				success && success(ret);
			} else {
				console.log('上传图片失败，请稍后重试')
			}
			api.closeFrame({
				name: $r.cryCommonLoader.name
			});
		});
	};
	m.uploadImage2 = function(path, file, success, errorFun) {
		var user = $App.getUser();
		api.ajax({
			url: m.config.CRY_API_URL + path,
			method: 'post',
			headers: {
				"device_id": api.deviceId,
				"cry_token": user.token
			},
			data: {
				values: {
					"device_id": api.deviceId,
					"cry_token": user.token,
				},
				files: {
					base64Str: file
				}
			}
		}, function(ret, err) {
			if(ret) {
				success && success(ret);
			} else {
				m.toast('上传图片失败，请稍后重试')
			}
		});
	};
	m.getTimeArr = function(args, callback) {
		var data = [],
			serviceStartHour = 0, //每天的开始小时设置
			serviceStartM = 0,
			serviceEndHour = 23, //每天的结束小时设置
			serviceEndM = 30,
			sub = [], //每天的小时数据
			curDate = new Date(new Date().getTime() + 1000 * 60 * 30), //当天的开始时间未当前时间半小时后，向上取整
			datesLast; //可选择的最大天数 
		if(args == 'datetime') { //选择小时需要添加的数据;取车时间
			datesLast = curDate.addDays(maxStartLease);
			sub = m.getHours(serviceStartHour, serviceStartM, serviceEndHour, serviceEndM);
		} else { //还车时间
			curDate = doc.getElementById("takecardate").value.replace(/-/g, '/');
			curDate = new Date(curDate);
			//还车日期为取车时间两天后，最小租期两天
			curDate.setDate(curDate.getDate() + 1);
			datesLast = curDate.addDays(maxLease - 1);
		}
		//获取两个月的时间数，放入json数组中
		while(datesLast.getTime() >= curDate.getTime()) {
			if(curDate.format('yyyy-MM-dd') == (new Date().format('yyyy-MM-dd'))) { //年月日显示处理
				name = curDate.getFullYear() + '年' + (curDate.getMonth() + 1) + '月' + curDate.getDate() + '日 今天';
			} else {
				name = curDate.getFullYear() + '年' + (curDate.getMonth() + 1) + '月' + curDate.getDate() + '日 ' + $App.WeekDay(curDate);
			}
			if(args == 'datetime') { //日期控件中有小时，处理小时数据
				var subTemp = null;
				//今天时处理开始小时
				if(curDate.getDate() == new Date().getDate() && curDate.getMonth() == new Date().getMonth()) {
					subTemp = m.getHours(curDate.getHours(), curDate.getMinutes(), serviceEndHour, serviceEndM);
					data.push({
						"name": name,
						"sub": subTemp
					});
				} else {
					data.push({
						"name": name,
						"sub": sub
					});
				}
			} else { //还车日期只显示日期
				data.push({
					"name": name
				});
			}
			curDate = curDate.addDays(1);
		}
		callback(data);
	};
	/**
	 * @Decription 根据开始时间、结束时间；返回日期控件小时数据
	 * @param StartHour{Number} 开始小时
	 * @param StartM{Number} 开始分钟
	 * @param EndHour{Number} 结束小时
	 * @param EndM{Number} 结束分钟
	 * @return sub{Array} 小时数组 eg[{name:'0:00'},{name:'0:30'}...,{name:'24:00'}]
	 * @author 彭火艳
	 */
	m.getHours = function(StartHour, StartM, EndHour, EndM) {
		var sub = [];
		for(var i = StartHour; i <= EndHour; i++) {
			if(i == StartHour && StartM > 30) {
				//
			} else if(StartHour === 0) {
				sub.push({
					"name": i + ':00'
				});
				sub.push({
					"name": i + ':30'
				});
			} else if(i === 24) {
				sub.push({
					"name": i + ':00'
				});
			} else if(i == StartHour && StartM <= 30) {
				sub.push({
					"name": i + ':30'
				});
			} else {
				sub.push({
					"name": i + ':00'
				});
				sub.push({
					"name": i + ':30'
				});
			}
		}
		return sub;
	}
	m.phone = function(tel) {
		api.call({
			type: 'tel_prompt',
			number: tel || m.config.CRY_SERVER_TEL
		});
	};
	/**
	 * 微信分享
	 * @param options
	 * @returns {Function}
	 * @author 杨凡
	 */
	m.ShareWX = function(options, callback) {
		var wx = api.require('wx');
		//判断当前设备是否安装微信客户端
		wx.isInstalled(function(ret, err) {
			if(ret.installed) {
				wx.shareWebpage({
					apiKey: '',
					scene: options['scene'] || 'timeline',
					title: options['title'] || '分享',
					description: options['description'] || '分享内容',
					thumb: options['thumb'],
					contentUrl: options['contentUrl']
				}, function(ret, err) {
					if(ret.status) {
						api.toast({
							msg: '分享成功'
						});
					} else {
						api.toast({
							msg: '用户取消'
						});
					}
				});
			} else {
				api.toast({
					msg: '当前设备未安装微信客户端'
				});
			}
		});
	};

	/*
	 * 页面配置
	 * 相同业务写到一起，不同业务空一行间隔
	 */
	w.$r = { //页面配置
		/**
		 * 启动页
		 */
		welcome: {
			name: 'welcome',
			url: 'widget://html/welcome.html'
		},
		/**
		 * 公共页面
		 */
		winOrderList: {
			name: 'common/win-order-list',
			url: 'widget://html/common/win-order-list.html'
		},
		winNormal: {
			name: 'common/win-normal',
			url: 'widget://html/common/win-normal.html'
		},
		//订单列表
		orderList: {
			name: 'common/order-list',
			url: 'widget://html/common/order-list.html'
		},
		//编辑订单
		orderEdit: {
			name: 'common/order-edit',
			url: 'widget://html/common/order-edit.html'
		},
		//选择车辆和司机
		selectCarDriver: {
			name: 'common/select-car-driver',
			url:'widget://html/common/select-car-driver.html'
		},
		//选择车辆
		selectCar: {
			name: 'common/select-car',
			url:'widget://html/common/select-car.html'
		},
		//选择司机
		selectDriver: {
			name: 'common/select-driver',
			url:'widget://html/common/select-driver.html'
		},
		//选择车型
		searchCar: {
			name: 'common/search-car-type',
			url:'widget://html/common/search-car-type.html'
		},
		//选择车辆header
		winCar: {
			name: 'common/win-car',
			url:'widget://html/common/win-car.html'
		},

		//找回密码头部
		signWin: {
			name:'sign/sign-win',
			url:'widget://html/sign/sign-win.html'
		},
		//登录
		signIn: {
			name:'sign/sign-in',
			url:'widget://html/sign/sign-in.html'
		},
		//找回密码
		fnPsw: {
			name:'sign/fn-psw',
			url:'widget://html/sign/fn-psw.html'
		},

		/**
		 * 取/送车
		 */
		orderDetail: {
			name: 'vehicleTransportation/order-detail',
			url: 'widget://html/vehicleTransportation/order-detail.html'
		},
		orderSubmit: {
			name: 'vehicleTransportation/order-submit',
			url: 'widget://html/vehicleTransportation/order-submit.html'
		},
		orderComplete: {
			name: 'vehicleTransportation/order-complete',
			url: 'widget://html/vehicleTransportation/order-complete.html'
		},
		//取送车订单详情header
		winTransportation: {
			name: 'vehicleTransportation/win-transportation',
			url: 'widget://html/vehicleTransportation/win-transportation.html'
		},

		/**
		 * 提/还车
		 */
		leasingOrderSubmit: {
			name: 'vehicleLeasing/order-submit',
			url: 'widget://html/vehicleLeasing/order-submit.html'
		},
		leasingOrderComplete: {
			name: 'vehicleLeasing/order-complete',
			url: 'widget://html/vehicleLeasing/order-complete.html'
		},
		//添加受损记录header
		leasingWinSave: {
			name: 'vehicleLeasing/win-save',
			url: 'widget://html/vehicleLeasing/win-save.html'
		},
		//添加受损记录
		leasingDamageRecord: {
			name: 'vehicleLeasing/relatedPage/damage-record',
			url: 'widget://html/vehicleLeasing/relatedPage/damage-record.html'
		},
		//提还车订单详情header
		winVehicleLeasing: {
			name: 'vehicleLeasing/win-vehicleLeasing',
			url: 'widget://html/vehicleLeasing/win-vehicleLeasing.html'
		},
		/**
		 * 合同
		 */
		//确认合同header
		winContract: {
			name: 'vehicleContract/win-contract',
			url: 'widget://html/vehicleContract/win-contract.html'
		},
		//选择用车人菜单
		contractSelectMenu: {
			name: 'vehicleContract/contract-select-menu',
			url: 'widget://html/vehicleContract/contract-select-menu.html'
		},
		//搜索用车人
		searchUser: {
			name: 'vehicleContract/relatedPage/search-user',
			url: 'widget://html/vehicleContract/relatedPage/search-user.html'
		},
		//租车
		contractEdit: {
			name: 'vehicleContract/contract-edit',
			url: 'widget://html/vehicleContract/contract-edit.html'
		},
		//创建合同
		contractCreate: {
			name: 'vehicleContract/contract-create',
			url: 'widget://html/vehicleContract/contract-create.html'
		},
		//确认合同
		contractComfirm: {
			name: 'vehicleContract/contract-comfirm',
			url: 'widget://html/vehicleContract/contract-comfirm.html'
		},
		//合同已签署
		contractComplete: {
			name: 'vehicleContract/contract-complete',
			url: 'widget://html/vehicleContract/contract-complete.html'
		},
		//设置分期
		setBill: {
			name: 'vehicleContract/relatedPage/setBill',
			url: 'widget://html/vehicleContract/relatedPage/setBill.html'
		},
		//押金收款
		depositReceivables: {
			name: 'vehicleContract/relatedPage/deposit-receivables',
			url: 'widget://html/vehicleContract/relatedPage/deposit-receivables.html'
		},
		//合同收款
		contractReceivables: {
			name: 'vehicleContract/relatedPage/contract-receivables',
			url: 'widget://html/vehicleContract/relatedPage/contract-receivables.html'
		},
		//分期详情
		billDetail: {
			name: 'vehicleContract/relatedPage/bill-detail',
			url: 'widget://html/vehicleContract/relatedPage/bill-detail.html'
		},
		//押金收款详情
		depositDetail: {
			name: 'vehicleContract/relatedPage/deposit-detail',
			url: 'widget://html/vehicleContract/relatedPage/deposit-detail.html'
		},
		//费用详情
		costDetail: {
			name: 'vehicleContract/relatedPage/cost-detail',
			url: 'widget://html/vehicleContract/relatedPage/cost-detail.html'
		},
		//合同收款详情
		contractDetail: {
			name: 'vehicleContract/relatedPage/contract-detail',
			url: 'widget://html/vehicleContract/relatedPage/contract-detail.html'
		},

		/**
		 * 调度
		 */
		//调度列表header
		winDispatch: {
			name: 'dispatch/win-dispatch',
			url:'widget://html/dispatch/win-dispatch.html'
		},
		//调度列表
		dispatchList: {
			name: 'dispatch/dispatch-list',
			url:'widget://html/dispatch/dispatch-list.html'
		},
		//调度执行
		dispatchCommand: {
			name: 'dispatch/dispatch-command',
			url:'widget://html/dispatch/dispatch-command.html'
		},
		//调度完成
		dispatchComplete: {
			name: 'dispatch/dispatch-complete',
			url:'widget://html/dispatch/dispatch-complete.html'
		},
		//调度列表筛选层
		filterModel: {
			name: 'dispatch/relatedPage/filter-model',
			url:'widget://html/dispatch/relatedPage/filter-model.html'
		},

		/**
		 * 个人中心
		 */
		my: {
			name: 'my/my',
			url:'widget://html/my/my.html'
		},
		//安全章程
		security: {
			name: 'my/security',
			url:'widget://html/my/security.html'
		},
		//使用指南
		docInfo: {
			name: 'my/docInfo',
			url:'widget://html/my/docInfo.html'
		}
	}

	/*
	 * 接口配置
	 * 相同业务写到一起，不同业务空一行间隔
	 */
	/**
	 * 登录
	 * param {userName password accountType deviceId phoneType}
	 */
	m.signIn = function(obj){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/user/login',
				type:'post',
				progress:false,
				element:'login_btn',
				data:obj,
				success:function(ret){
					resolve(ret);
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	/**
	 * 退出登录
	 */
	m.signOut = function(){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/user/logout',
				type:'post',
				progress:false,
				flag:true,
				success:function(ret){
					resolve(ret);
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	/**
	 * 获取验证码
	 */
	m.getCode = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/verifyCode/verifyCodeUser',
				type:'get',
				progress:false,
				data: {
					phoneNumber: options.phoneNumber,
					type: options.type,   //1:用户注册 2:找回密码,修改密码 3:短信登录
					accountType:options.accountType      //登录账户类型:2-司机，3-客户 ，4-企业经办人,
				},
				success:function(ret){
					resolve(ret);
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	/**
	 * 忘记密码
	 */
	m.updUserPass = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/user/updUserPass',
				type:'post',
				progress:false,
				element:'findpwd_btn',
				data:options,
				success:function(ret){
					resolve(ret);
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//首页GET
	m.indexGet = function(date){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/homePage?takeCarTime='+date,
				type:'get',
				progress:false,
				flag:true,
				// data:{
				// 	// takeCarTime:date,
				// },
				success:function(ret){
					resolve(ret);
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//取送车订单列表页
	m.transportationListRequest = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/pickSendList?len='+options.len+'&&lastId='+options.lastId+'&&takeCarTime='+options.takeCarTime+'&&type='+options.type,
				type:'get',
				progress:false,
				flag:true,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//取送车订单详情
	m.transportationInfoRequest = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/getPickSendInfo?id='+options.id,
				type:'get',
				progress:false,
				flag:true,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//开始取送车
	m.transportationSubmit = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/pickSendCar',
				type:'post',
				progress:false,
				flag:true,
				data:options,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//取送车完成
	m.transportationComplete = function(id){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/pickSendArrived?id='+id,
				type:'post',
				progress:false,
				flag:true,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//提还车列表
	m.leasingListRequest = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/takeBackList?pageSize='+options.pageSize+'&&currentPage='+options.currentPage+'&&takeCarTime='+options.takeCarTime+'&&type='+options.type,
				type:'get',
				progress:false,
				flag:true,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//提还车订单详情
	m.leasingInfoRequest = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/getTakeBackInfo?contractId='+options.contractId+'&&takeCarType='+options.takeCarType,
				type:'get',
				progress:false,
				flag:true,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//交车
	m.leasingGetSubmit = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/takeCar',
				type:'post',
				progress:false,
				flag:true,
				data: {
					contractId: options.contractId,
					takeTime: options.takeTime,
					panelImage: options.panelImage,
					remark: options.remark,
					fuelScale: options.fuelScale,
					currentMail: options.currentMail,
					validateCarList: options.validateCarList,
					damagedList: options.damagedList
				},
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	//接车
	m.leasingBackSubmit = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v4/app/appStores/backCar',
				type:'post',
				progress:false,
				flag:true,
				data: {
					takeCarId: options.takeCarId,
					returnTime: options.returnTime,
					remark: options.remark,
					contractId: options.contractId,
					returnCity: options.returnCity,
					returnBranchId: options.returnBranchId,
					fuelScale: options.fuelScale,
					currentMail: options.currentMail,
					panelImage: options.panelImage,
					returnCarValidateDOS: options.returnCarValidateDOS,
					damagedList: options.damagedList
				},
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	/**
	 * 安全章程列表,使用指南，常见问题
	 */
	m.getDocInfo = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/appDocument/getDocumentListByCode',
				type:'GET',
				progress:false,
				flag:true,
				data:options,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	/**
	 * 安全章程详情
	 */
	m.securityList = function(options){
		return new Promise(function(resolve,reject){
			m.AjaxByToken({
				url:'/v2/app/appDocument/getDocumentListById',
				type:'GET',
				progress:false,
				flag:true,
				data:options,
				success:function(ret){
					if(ret.success && ret.success == true){
						resolve(ret);
					}else{
						reject(ret);
					}
				},
				error:function(err){
					reject(err);
				}
			});
		});
	}
	w.$App = m;
})(window); 