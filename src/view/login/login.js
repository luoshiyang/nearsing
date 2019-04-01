(function(w){
    var m = {};
    m.init = function(){
        var tag = document.body;
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        tag.appendChild(canvas);
        this.winW = document.documentElement.clientWidth*2;
        this.winH = document.documentElement.clientHeight*2;
        canvas.width = this.winW;
        canvas.height = this.winH;
        this.ctx = canvas.getContext('2d');
        this.circle = new Array();
        for(var i=0; i<9; i++){
            this.circle.push(new Draw(this.ctx));
        }
        m.updateAll();
    }
    m.updateAll = function(){
        var _this = this;
        this.ctx.clearRect(0,0,this.winW,this.winH);
        for(var i=0; i<9; i++){
            this.circle[i].update();
        }
        setTimeout(function(){
            _this.updateAll();
        },10);
    }
    m.canvasImg = function(){
        var imgUrl = this.canvas.toDataURL('image/png');
        var imgObj = new Image();
        imgObj.src = imgUrl;
        document.body.appendChild(imgObj);
    }
    var Draw = function(state){
        // this.layer = state.getContext('2d');
        this.state = state;
        this.color = ['#4BD9FF','#FFF85E','#2CFFA0','#FF82E0'];
        this.count = 2;
        this.lineArr();
    }
    Draw.prototype = {
        lineArr: function(){
            this.win_w = document.documentElement.clientWidth*2 || document.body.width*2;
            this.win_h = document.documentElement.clientHeight*2 || document.body.height*2;
            this.circle_r = Math.floor(Math.random()*3+1)*15;
            this.circle_color = this.color[Math.floor(Math.random()*4)];
            this.circle_coor_x = Math.floor(Math.random()*this.win_w);
            this.circle_coor_y = Math.floor(Math.random()*this.win_h);
            this.velocity_x = Math.floor(Math.random()*8-4);
            this.velocity_y = Math.floor(Math.random()*8-4);
            this.draw();
        },
        update: function(){
            if(this.circle_coor_x < this.win_w && this.circle_coor_x > 0){
                this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            }else{
                this.velocity_x = -this.velocity_x;
                this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            }
            if(this.circle_coor_y < this.win_h && this.circle_coor_y > 0){
                this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            }else{
                this.velocity_y = -this.velocity_y;
                this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            }

            // if(this.circle_coor_y > (this.win_h-1200)/2 && this.circle_coor_y < (this.win_h+1200)/2){
            //     if(this.circle_coor_x > 0 && this.circle_coor_x < (this.win_w-2000)/2){
            //         this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            //     }else if(this.circle_coor_x > (this.win_w+2000)/2 && this.circle_coor_x < this.win_w){
            //         this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            //     }else{
            //         this.velocity_x = -this.velocity_x;
            //         this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            //     }
            // }else{
            //     if(this.circle_coor_x < this.win_w && this.circle_coor_x > 0){
            //         this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            //     }else{
            //         this.velocity_x = -this.velocity_x;
            //         this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            //     }
            // }

            // if(this.circle_coor_x > (this.win_w-2000)/2 && this.circle_coor_x < (this.win_w+2000)/2){
            //     if(this.circle_coor_y > 0 && this.circle_coor_y < (this.win_h-1200)/2){
            //         this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            //     }else if(this.circle_coor_y > (this.win_h+1200)/2 && this.circle_coor_y < this.win_h){
            //         this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            //     }else{
            //         this.velocity_y = -this.velocity_y;
            //         this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            //     }
            // }else{
            //     if(this.circle_coor_y < this.win_h && this.circle_coor_y > 0){
            //         this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            //     }else{
            //         this.velocity_y = -this.velocity_y;
            //         this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            //     }
            // }
            this.draw();
        },
        draw: function(){
            this.state.beginPath();
            this.state.fillStyle = this.circle_color;
            // console.log(1);
            this.state.arc(this.circle_coor_x,this.circle_coor_y,this.circle_r,0,2*Math.PI);
            this.state.closePath();
            this.state.fill();
        },
        drawBg: function(){
            this.state.fillStyle = '#34393a';
            this.state.beginPath();
            this.state.rect(0,0,win_w*2,win_h*2);
            this.state.closePath();
            this.state.fill();
        },
        emptyRect: function(){
            if(this.circle_coor_x > (this.win_w-2000)/2 && this.circle_coor_x < (this.win_w+2000)/2 && this.circle_coor_y > (this.win_h-1200)/2 && this.circle_coor_y < (this.win_h+1200)/2){
                this.velocity_x = -this.velocity_x;
                this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            }else{
                this.circle_coor_x = this.circle_coor_x+this.velocity_x;
            }
            if(this.circle_coor_y > (this.win_h-1200)/2 && this.circle_coor_y < (this.win_h+1200)/2 && this.circle_coor_x > (this.win_x-2000)/2 && this.circle_coor_x < (this.win_x+2000)/2){
                this.velocity_y = -this.velocity_y;
                this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            }else{
                this.circle_coor_y = this.circle_coor_y+this.velocity_y;
            }
        }
    };
    w.$loginAnimateBg = m;
})(window);