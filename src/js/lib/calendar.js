(function(w){
    var m = {};
    /**
     * ======================================================
     * 建月份的日期数据，0为当月，以此类推
     */
    m.setMonth = function(inx){
        var exp = new Date();

        
        //今年的年份
        this.this_year = parseInt(exp.format('yyyy'));
        //这个月的月份
        this.this_month = parseInt(exp.format('MM'))+inx;

        //当相加后的月份值大于12时，取除以12的正整数，加上当前年份等于新的年份。余下的小于12的值则为新的月份
        if(this.this_month>12){
            var over_num = Math.floor(this.this_month/12);
            var float_num = this.this_month - over_num*12;
            this.this_year = this.this_year+over_num;
            this.this_month = float_num;
        }

        //当相加后的月份值小于1时，说明日期需要往前追溯，以当前月份值减12
        if(this.this_month<1){
            var over_num = Math.ceil((this.this_month-12)/12);
            var float_num = this.this_month - over_num*12;
            this.this_year = this.this_year+over_num;
            this.this_month = float_num;
        }

        //这个月的第一天
        var first_day = this.this_year+"-"+this.this_month+"-01";
        first_day = new Date(first_day);
        // first_day = first_day.format('dd');

        //获取这个月的总天数
        var new_exp = new Date(first_day.format('yyyy'),first_day.format('MM'),0);
        var day_count = new_exp.getDate();

        //获取这个月的所有日期数据,以1号为起点
        var mon_data = new Array();
        for(var i=0; i<day_count; i++){
            var tempDate = m.getDay(first_day,i);
            mon_data.push(tempDate);
        }
        this.monData = {
            year:this.this_year,
            mon:this.this_month,
            monData: mon_data
        }

        m.createDom();
    }
    /**
     * ======================================================
     * 传入date时间数据，返回日期，星期，date对象，以及是否为今天的属性
     */
    m.getDay = function(date,index,disable){
        //date不存在时，默认以今天为起点开始计算。
        var exp;
        var today = new Date();
        if(date){
            exp = new Date(date.getTime()+1000*60*60*24*index);
        }else{
            exp = new Date();
            exp = new Date(exp.getTime()+1000*60*60*24*index);
        }
        //当前日期
        var thisDay = exp.format('dd');
        //当前星期
        var thisweek = m.WeekDay(exp);
        //判断是否是今天，true今天
        var active = (exp.format('yyyy-MM-dd') === today.format('yyyy-MM-dd'))?true:false;

        //返回的数据在日历中，是否可点击，默认false（可点击）
        if((disable || disable === '') && typeof disable !== 'boolean'){
            throw new Error("getDay(date,index,disable);方法 若传disable参数必须是布尔类型，true为该日期是当月有效日期，false为不是当月的有效日期，不可点击");
        }
        var disable = (disable)?disable:false;

        return {
            thisDay: thisDay,
            thisweek: thisweek,
            date: exp,
            active: active,
            disable: disable
        };
    }
    /**
     * ======================================================
     * 初始化
     */
    m.init = function(option,callback){
        /**
         * 全局变量
         */
        this.weekData = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
        //这个月的日历数据
        this.monData = {};
        //回调函数
        this.callback= callback;

        var wholeMonth = 0;
        if(option){
            option = option.split('-');
            if(option.length !== 2){
                throw new Error('传入的日期必须是年月格式，以-号分隔。示例：yyyy-mm');
                return;
            }
            if(Number(option[1])>12 || Number(option[1])<1){
                throw new Error('日期格式错误');
                return;
            }
            //把传日的日期转换成以月为单位的值
            wholeMonth = Number(option[0])*12+Number(option[1]);
        }
        
        //计算这个月是公历的第多少个月
        var exp = new Date();
        var todayYear = exp.format('yyyy');
        var todayMonth = exp.format('MM');
        var todayWholeMonth = Number(todayYear)*12+Number(todayMonth);
        //传入的值减去这个月的值，等于以这个月为参照，推移的月数，为正是未来，为负是历史
        this.minMonth;
        if(wholeMonth === 0){
            this.minMonth = 0;
        }else{
            this.minMonth = wholeMonth - todayWholeMonth;
        }
        m.setMonth(this.minMonth);
    }
    /**
     * 创建dom
     */
    m.createDom = function(){
        var tag = document.body;
        var wrapper = document.querySelector('.calendar-wrapper');
        if(!wrapper){
            wrapper = document.createElement('div');
            var header = document.createElement('div');
            var wrap = document.createElement('div');
            wrapper.classList = 'calendar-wrapper';
            header.classList = 'cal-header';
            wrap.classList = 'cal-wrap';
            wrapper.appendChild(header);
            wrapper.appendChild(wrap);
            tag.appendChild(wrapper);
            m.insertHeader(header);
            m.insertDate(wrap);
        }else{
            var header = document.querySelector('.cal-header');
            var wrap = document.querySelector('.cal-wrap');
            m.insertHeader(header);
            m.insertDate(wrap);
        }
    }
    /**
     * ======================================================
     * 插入header头部
     */
    m.insertHeader = function(tag){
        tag.innerHTML = '';
        var data = this.monData;
        var html = '';
            html = '<div class="left-double-arrow updateCalendar"></div>',
            html += '<div class="left-arrow updateCalendar"></div>',
            html += '<div class="">',
            html += '<span class="blue-padded-r-15">'+ data.year +'年</span>',
            html += '<span>'+ data.mon +'月</span>',
            html += '</div>',
            html += '<div class="right-arrow updateCalendar"></div>',
            html += '<div class="right-double-arrow updateCalendar"></div>';
        tag.innerHTML = html;
    }
    /**
     * ======================================================
     * 插入星期数
     */
    m.insertWeek = function(tag){
        var html = '';
            html = '<div class="cal-wrap-header"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>';
        tag.innerHTML = html;
    }
    /**
     * ======================================================
     * 插入日历日期
     */
    m.insertDate = function(tag){
        tag.innerHTML = '';
        m.insertWeek(tag);
        var wrapper = document.createElement('div');
        wrapper.classList = 'cal-wrap-content';
        var data = this.monData;
        var dateArr = data.monData;
        //当月1号在日历单排中的位置。（0～6），以今天为起点，往前补全当月第一周的数据。
        var first_day = dateArr[0];
        var first_day_index = this.weekData.indexOf(first_day.thisweek);
        for(var i=0;i<first_day_index;i++){
            dateArr.unshift(m.getDay(first_day.date,-1-i,true));
        }
        //当月最后一天在日历单排中的位置。（0～6），以今天为起点，往后补全当月最后一周的数据。
        var last_day = dateArr[dateArr.length-1];
        var last_day_index = 6-this.weekData.indexOf(last_day.thisweek);
        for(var i=0;i<last_day_index;i++){
            dateArr.push(m.getDay(last_day.date,i+1,true));
        }

        //这个月的星期数
        var week_num = Math.ceil(dateArr.length/7);

        //渲染日期数据
        var html = '';
        for(var i=0;i<week_num;i++){
            var xhtml = '';
            for(var j=0;j<7;j++){
                var active = (dateArr[7*i+j].active)?'active':'';
                var disable = (dateArr[7*i+j].disable)?'disable':'';
                xhtml += '<div class="date-item '+disable+''+active+'" onclick="sclItem('+(7*i+j)+')">'+ dateArr[7*i+j].thisDay +'</div>';
            }
            html += '<div class="cal-wrap-item">'+xhtml+'</div>';
        }
        wrapper.innerHTML = html;
        tag.appendChild(wrapper);
        m.updateCalendar();
    }
    m.updateCalendar = function(){
        var btnArr = document.querySelectorAll('.updateCalendar');
        var _this = this;
        for(var i=0;i<btnArr.length;i++){
            (function(index){
                btnArr[index].addEventListener('click',function(){
                    switch (index){
                        //上一年
                        case 0:
                        _this.minMonth = _this.minMonth - 12;
                        break;
                        //上个月
                        case 1:
                        _this.minMonth = _this.minMonth - 1;
                        break;
                        //下个月
                        case 2:
                        _this.minMonth = _this.minMonth + 1;
                        break;
                        //下一年
                        case 3:
                        _this.minMonth = _this.minMonth + 12;
                        break;
                    }
                    m.setMonth(_this.minMonth);
                });
            })(i);
        }
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
    function sclItem(i){
        var dateWrap = document.querySelector('.cal-wrap-content');
        var dateGroup = dateWrap.querySelectorAll('.date-item');
        for(var k=0;k<dateGroup.length;k++){
            dateGroup[k].classList.remove('active');
        }
        dateGroup[i].classList.add('active');
        this.$calendar.callback(this.$calendar.monData.monData[i]);
    }
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
    w.$calendar = m;
    w.sclItem = sclItem;
})(window)