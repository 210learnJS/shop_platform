window.onload = function(){
    var $banner=document.getElementsByClassName('banner')[0]
        var imgs=$banner.getElementsByTagName('img');
        var w=imgs[1].width;//图片的宽度
        var h=imgs[1].height;
        var count=0;//标记值
        var timer;//定时器       
        //设置banner的宽高
        var $banner=document.getElementsByClassName('banner')[0];
        $banner.style.width=w+'px';//设置轮播图的窗口大小和图片大小相同
        $banner.style.height=h+'px';     
        //获取图片的个数
        var len=imgs.length;
        console.log(len);
        
        // //动态添加btn
        // var btn=document.getElementsByClassName('btn')[0]
        // for(var i=0;i<len;i++){
        //     var code=document.createElement('li');
        //     var numbers=document.createTextNode(i+1);
        //     btn.appendChild(code);
        //     code.appendChild(numbers)
        // }
        
        /*动态播放*/
        function autoPlay(){
            timer=setInterval(function(){
                //动态的count值
                if(count<len-1){
                    count++   
                }else{
                    //到最后一张图时回到第一张
                    count=0
                }
                //开始播放
                play()
            },2000)
        }     
        //获取轮播图的ul
        var lunbo=document.getElementsByClassName('lunbo')[0];      
        //设置轮播ul的宽度让li可以浮动
        lunbo.style.width=w*len+'px';       //这里设置了ul容器的宽度是300px       
        //播放;
        function play(){
            //轮播图通过right值实现
            lunbo.style.right=w*count+'px';        
        }      
       //清除定时器
        function stop(){
            clearInterval(timer)
        }
        $banner.onmouseover = stop;
        $banner.onmouseover = "this.style.cursor:'hand'";
        //$banner.onmouseout = autoplay;
        //函数运行
        autoPlay()  
    }
    
    