(function(w){
     var m = {};
     m.init = function(options,callback){
        this.options = {};
        this.options.el = 'bluePagination';
        this.pageArr = new Array();
        this.pageIndex = 1;
        this.pageVal = 1;
        if(options){
            for(i in options){
                this.options[i] = options[i];
            }
        }
        if(callback && typeof callback === 'function'){
            this.callback = callback;
        }
        this.tag = document.getElementById(this.options.el);
        this.nav = document.createElement('nav');
        this.nav.classList = 'blue-pagination';
        this.nav.setAttribute('aria-label','Page navigation');
        for(var i=0;i<this.options.count;i++){
            this.pageArr.push(i+1);
        }
        this.tag.appendChild(this.nav);
        m.ceatePage();
     }
     m.ceatePage = function(){
        this.nav.innerHTML = '';
        this.tempPageArr = this.pageArr.slice((this.pageIndex-1)*5,this.pageIndex*5);
        var pageNum = this.tempPageArr.length + 2;
        var html = '';
        var ul = document.createElement('ul');
        ul.classList = 'pagination';
        for(var i=0;i<pageNum;i++){
            if(i==0){
                html += '<li><a href="#" aria-label="Previous" onclick="prev()"><span aria-hidden="true">&laquo;</span></a></li>';
            }else if(i>0 && i<(pageNum-1)){
                if(this.tempPageArr[i-1]==this.pageVal){
                    html += '<li class="page-item active"><a href="#">'+this.tempPageArr[i-1]+'</a></li>';
                }else{
                    html += '<li class="page-item" onclick="choosePage('+(i-1)+')"><a href="#">'+this.tempPageArr[i-1]+'</a></li>';
                }
            }else if(i==(pageNum-1)){
                html += '<li><a href="#" aria-label="Next" onclick="next()"><span aria-hidden="true">&raquo;</span></a></li>';
            }
        }
        ul.innerHTML = html;
        this.nav.appendChild(ul);

        var form = document.createElement('form');
        form.classList = 'form-inline page-count';
        form.innerHTML = '<div class="form-group">'
            +'<label for="exampleInputEmail1">共'+ this.pageArr.length +'页,前往</label>'
            +'<input type="text" class="form-control" id="exampleInputEmail1" placeholder="Go">'
            +'<label>页</label>'
        +'</div>';
        this.nav.appendChild(form);
     }
     function prev(){
        if($pagination.pageIndex == 1){
            $alert.show({
				type: "error",
				text: "当前已是第一页",
				positions: "center",
				duration: 300
			});
            return;
        }
        $pagination.pageIndex--;
        $pagination.ceatePage();
     }
     function next(){
        if($pagination.pageIndex == Math.ceil($pagination.pageArr.length/5)){
            $alert.show({
				type: "error",
				text: "当前已是最后一页",
				positions: "center",
				duration: 300
            });
            return;
        }
        $pagination.pageIndex++;
        $pagination.ceatePage();
     }
     function choosePage(k){
        var pageGroup = document.querySelectorAll('.page-item');
        for(var i=0;i<pageGroup.length;i++){
            pageGroup[i].classList.remove('active');
        }
        pageGroup[k].classList.add('active');
        $pagination.pageVal = $pagination.tempPageArr[k];
        $pagination.callback($pagination.pageVal);
     }
     w.$pagination = m;
     w.next = next;
     w.prev = prev;
     w.choosePage = choosePage;
})(window);