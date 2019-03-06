(function(w){
    var modal = function(options,callback){
        this.options = {};
        this.options.type = 'normal';
        this.options.title = '标题';
        if(callback && typeof callback === 'function'){
            this.callback = callback;
        }
        for(i in options){
            this.options[i] = options[i];
        }
        this.init();
        this.statusListen();
    }

    modal.prototype = {
        init: function(){
            var tag = document.body;
            var modal_wrapper_type,modal_type;
            if(this.options.type == 'normal'){
                modal_wrapper_type = '';
                modal_type = '';
            }else if(this.options.type == 'large'){
                modal_wrapper_type = 'bs-example-modal-lg';
                modal_type = 'modal-lg';
            }else if(this.options.type == 'small'){
                modal_wrapper_type = 'bs-example-modal-sm';
                modal_type = 'modal-sm';
            }
            var html =  '<div class="modal-dialog '+modal_type+'" role="document">';
                html += '<div class="modal-content">';
                html += '<div class="modal-header">';
                html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                html += '<h4 class="modal-title" id="myModalLabel">'+this.options.title+'</h4>';
                html += '</div>';
                html += '<div class="modal-body">'+this.options.content+'</div>';
                html += '<div class="modal-footer">';
                html += '<button type="button" class="btn btn-default" onclick="modalCancel();">Close</button>';
                html += '<button type="button" class="btn btn-primary" onclick="modalComfirm();">Save changes</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            this.wrapper = document.createElement('div');
            this.wrapper.classList = 'modal fade '+modal_wrapper_type;
            this.wrapper.setAttribute('tabindex','-1');
            this.wrapper.setAttribute('role','dialog');
            this.wrapper.setAttribute('aria-labelledby','myModalLabel');
            tag.appendChild(this.wrapper);
            this.wrapper.innerHTML = html;
        },
        toggle: function(){
             var $wrapper = $(this.wrapper);
             $wrapper.modal('toggle');
        },
        statusListen: function(){
            var self = this;
            $(this.wrapper).on('shown.bs.modal', function (e) {
                // do something...
                self.callback({
                    type: 'show',
                    data: e
                });
            })
            $(this.wrapper).on('hidden.bs.modal', function (e) {
                // do something...
                self.callback({
                    type: 'hide',
                    data: e
                });
            })
        }
    };

    function modalCancel(){
        console.log(this.Modal);
        $(this.Modal.wrapper).modal('toggle');
        this.Modal.callback({
            type: 'cancel',
            data: {}
        });
    }
    function modalComfirm(){
        $(this.Modal.wrapper).modal('toggle');
        this.Modal.callback({
            type: 'comfirm',
            data: {}
        });
    }

    w.Modal = modal;
    w.modalCancel = modalCancel;
    w.modalComfirm = modalComfirm;
})(window)