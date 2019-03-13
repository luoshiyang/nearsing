(function(w){
    var drop = function(options,callback){
        this.options = {};
        this.options.el = 'dropdwon';
        this.options.select = false;
        if(callback && typeof callback === 'function'){
            this.callback = callback;
        }
        for(i in options){
            this.options[i] = options[i];
        }
        this.init();
    }

    drop.prototype = {
        // init: function(){
        //     var self = this;
        //     var tag = document.getElementById(self.options.el);
        //     var listArr = self.options.list;
        //     var html = '';
        //     var wrapper = tag.getElementsByClassName('dropdown-menu')[0];
        //     for(var i = 0; i < listArr.length; i++){
        //         if(listArr[i].underLine){
        //             html += '<li><a href="#" onclick="dropDownChoose('+i+');">'+listArr[i].name+'</a></li>',
        //             html += '<li class="divider" role="separator"></li>';
        //         }else{
        //             html += '<li><a href="#" onclick="dropDownChoose('+i+');">'+listArr[i].name+'</a></li>';
        //         }
        //     }
        //     wrapper.innerHTML = html;
        // },
        init: function(){
            var self = this;
            var tag = document.getElementById(self.options.el);
            var wrapper = tag.getElementsByClassName('dropdown-menu')[0];
            var listArr = self.options.list;
            this.tag = tag;
            // wrapper.classList = 'dropdown-menu';
            // tag.appendChild(wrapper);
            for(var i = 0; i < listArr.length; i++){
                var item = document.createElement('li');
                var link = document.createElement('a');
                link.innerHTML = listArr[i].name;
                link.setAttribute('href','#');
                item.appendChild(link);
                if(listArr[i].underLine){
                    var underLine = document.createElement('li');
                    underLine.classList = 'divider';
                    underLine.setAttribute('role','separator');
                    wrapper.appendChild(underLine);
                }
                wrapper.appendChild(item);
                (function(index){
                    item.addEventListener('click',function(){
                        if(self.callback && typeof self.callback === 'function'){
                            self.select(listArr[index]);
                            self.callback(listArr[index]);
                        }
                    });
                })(i);
            }
        },
        select: function(val){
            var self = this;
            var select = self.options.select;
            var selectHeader = self.tag.getElementsByClassName('select-val')[0];
            if(select === true){
                selectHeader.innerHTML = val.name;
            }
        }
    }
    w.Drop = drop;
})(window)