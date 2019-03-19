(function(w){
    var m = {};
    m.init = function(options,callback){
        this.options = {};
        this.options.el = options.el;
        this.options.data = options.data;
        var wrapId = this.options.el;
        var treeWrap = document.getElementById(wrapId);
        var mockdata = this.options.data;
        for(var i=0; i<mockdata.length; i++){
            var wrap = document.createElement('div');
            wrap.classList = 'panel panel-default';
            var html = '<div class="panel-heading tree-item" role="tab" id="heading'+ wrapId + mockdata[i].id +'">'
                +'<h4 class="panel-title">'
                    +'<a role="button" data-toggle="collapse" data-parent="#'+ wrapId +'" href="#'+ wrapId + mockdata[i].id +'" aria-expanded="false" aria-controls="'+ wrapId + mockdata[i].id +'">'
                        +mockdata[i].name
                    +'</a>'
                +'</h4>'
                +'</div>';
            var treeContent = document.createElement('div');
            treeContent.setAttribute('id',wrapId + mockdata[i].id);
            treeContent.setAttribute('role','tabpanel');
            treeContent.setAttribute('aria-labelledby',wrapId + mockdata[i].id);
            treeContent.classList = 'panel-collapse collapse';
            var xhtml = '';
            for(var j=0; j< mockdata[i].listArr.length; j++){
                xhtml += '<li class="list-group-item">'+ mockdata[i].listArr[j] +'</li>';
            }
            treeContent.innerHTML = '<ul class="list-group">'+xhtml+'</ul>';
            wrap.innerHTML = html;
            wrap.appendChild(treeContent);
            treeWrap.appendChild(wrap);
        }
        //点击active事件
        var listGroup = treeWrap.querySelectorAll('.tree-item');
        for(var i=0;i<listGroup.length;i++){
            var thisIndex = listGroup[i];
            thisIndex.addEventListener('click',function(){
                console.log(this);
                for(var j=0;j<listGroup.length;j++){
                    listGroup[j].classList.remove('active');
                }
                this.classList.add('active');
            });
        }
    }
    w.$tree = m;
})(window);