(function($){
    $.fn.extend({
        geneEffect:function(options){
            var ecf=new effect(this,options);
            //添加画布
            this[0].appendChild(canvas);
        }
    })
    var canvas = document.createElement('canvas');
    //样式设置
    canvas.style.position = 'absolute';
    canvas.style.left = canvas.style.top = '0';
    var ctx = canvas.getContext('2d');
    var enitites=[];
    var defaults={
        ele:$('body')[0],//元素
        type:"snow",//特效类型
        x: 0.5, //x轴移动速度
        y:1,//y轴移动速度
        w:600,//宽度
        h:500,//高度
        max:200,//存储的一次性产生的最大数目
        radius:1.5,//半径
        opacity:0.9,//透明度
        color: "#FFF"//颜色
    }
    var effect=function(ele,options){
        if(options==null||typeof(options)=="undefined")
            options={};
        options.ele=ele[0];
        canvas.width=ele[0].clientWidth;
        canvas.height=ele[0].clientHeight;
        //设置高度宽度 (与覆盖元素一样)
        this.width = ele[0].clientWidth;
        this.height =ele[0].clientHeight;
        //覆盖defaults
        defaults=$.extend({},defaults,options)
        defaults.w=this.width;
        defaults.h=this.height;
        //创建实体集合
        this.createEnities();
        //绘出界面
        update();

    }
    effect.prototype={

        createEnities:function(){
            enitites=[];
            for(var i=0;i<defaults.max;i++){
                var def=new opt();
                enitites.push(def);
            }
        }
    }
    //实体类
    var opt=function(){
        this.init();//初始化方法
    }
    opt.prototype.init=function(){
        this.x=defaults.w*Math.random()+defaults.x;
        this.y=defaults.h*Math.random()+defaults.y;
        this.opacity=defaults.opacity*Math.random();
        this.radius=defaults.radius+Math.random();
        this.type=defaults.type;
    }
    //每一帧走一次
    function update(){
        //清空画布 形成动画效果
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var flag=0;
        for (var i=0;i<enitites.length;i++) {
            var opt=enitites[i];
            //如果是雪花特效
            if(opt.type=="snow"){
                opt.x=opt.x+Math.random()*0.5;
                opt.y=opt.y+Math.random()*1;
                //生产雪花
                snowEffect(opt.x,opt.y,opt.opacity, opt.radius);
            }
            //超过高度在执行一下init方法
            if(opt.y>canvas.height)
            {
                opt.init();
            }

        }
        //重绘画面接着执行update
        requestAnimFrame(update);

    }

    function snowEffect(x,y,o,r){
        //alert("1")
        ctx.save();
        //ctx.strokeStyle="#FFF";
        ctx.fillStyle = "#FFF";
        ctx.globalAlpha=o;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

})(jQuery)
