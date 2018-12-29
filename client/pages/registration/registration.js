/*
作者: 汽水
日期：2018.12.22
功能：注册页
*/


function $(id){
    return document.getElementById(id);
}

var register = {
    promt: ["必填，长度为4-16位","手机号可用于登录、找回密码、接收订单通知等服务","密码为6-20个字符，可由英文、数字及符号组成","请再次输入密码"],
    judge:[false,false,false,false,false],
    addEventHandler: function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        } else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    }

};
var ipt = document.getElementsByTagName("input");
for(var i=0;i<ipt.length;i++){
    (function(k){
        register.addEventHandler(ipt[k],'click',function(){
            var num = 'J'+k;
            $(num).innerHTML = register.promt[k];
        })
    })(i);
    register.addEventHandler(ipt[i],"blur",check);

}
