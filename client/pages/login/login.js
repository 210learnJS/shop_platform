/*
作者: 汽水
日期：2018.12.22
功能：登录页
*/


var { PATH, PORT } = constant;
var ipt = document.getElementsByTagName('input');
var tips = document.getElementById('warn');
var account = ipt[0];
var password = ipt[1];
var btn = document.getElementById('btn');

function verify(name,pwd){
    if(name==""||pwd==""){
        return false;
    }
    return true;
}

btn.addEventListener('click',function(){
    var param = {
        username: ipt[0].value,
        password: ipt[1].value,
    }
    if(verify(param.username,param.password)){
        http.post( PATH +"/login", param,function(err,data){
            if(!err){
                if(data.result.usernameExist){
                   if(data.result.passwordOK){
                        $.cookie("userid",data.result.userID,{expires:7,path:'/'});
                        tips.innerHTML = "";
                        tips.style.display = "none";
                        window.location.href = 'http://localhost:8888/pages/index/index.html';
                   }else{
                        tips.style.display = "block";
                        tips.innerHTML = "密码错误";
                        tips.className = "warn";
                   }
                }else{
                    tips.style.display = "block";
                    tips.innerHTML = "用户名不存在";
                    tips.className = "warn";
                }
            }
        })
    }else{
        tips.style.display = "block";
        tips.innerHTML = "输入不能为空";
        tips.className = "warn";
    }
})

