/*
作者: 汽水
日期：2018.12.22
功能：登录页
*/




// var { PATH, PORT } = constant;
   
// var butt=document.getElementById("1");
// butt.addEventListener("click",function(){
//     var n = document.getElementById("input").value;
//     n = Number(n, 10);
//     http.get( PATH + "/search" , {id: n}, function(err, data){
//         if(!err){
//             console.log(data);
//             document.getElementById("div").innerHTML = "username:"+data.result[0].username+" password:"+data.result[0].password;
//         }
//     });
// });

var { PATH, PORT } = constant;
var ipt = document.getElementsByTagName('input');
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
        http.post( PATH +"/search", param,function(err,data){
            if(!err && data.status.code !=0){
                window.location.href = 'http://localhost:8888/pages/index/index.html';
            }else {
                alert("用户名不存在或密码错误，请重新输入");
            }
        })
    }else{
        alert("输入不能为空");
    }
})

