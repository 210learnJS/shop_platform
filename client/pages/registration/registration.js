/*
作者: 汽水
日期：2018.12.22
功能：注册页
*/
var { PATH, PORT } = constant;
var ipt = document.getElementsByTagName("input");

var param = {
    username: "",
    phone:0,
    password:""
}
var save;

var register = {
    promt: ["必填，长度为4-16位","手机号可用于登录、找回密码、接收订单通知等服务","密码为6-20位，可由英文、数字及符号至少两种组成","请再次输入密码"],
    judge:[false,false,false,false,false],
    getLength: function(str){
        var realLength=0;
        var charCode=-1;
        for(var i=0;i<str.length;i++){
            charCode=str[i].charCodeAt(i);
            if(charCode>=0 && charCode<=128) realLength+=1;
            else realLength+=2;
        }
        return realLength;
    },
    validateUsername: function(tips,iptBor,con){
        if(this.getLength(con)>=4 && this.getLength(con)<=16){
            http.post(PATH +"/registration",param,function(err,data){
                if(!err ){
                    if(data.status.code == 0){
                        tips.innerHTML = "用户名已占用，请重新输入";
                        tips.style.color="red";
                        iptBor.style.borderColor = "red";
                    }else{
                        tips.innerHTML = "输入格式正确";
                        tips.style.color="green";
                        this.judge[0]=true;
                    }
                }
            })
        }else{
            tips.innerHTML = "输入格式不正确，请重新输入";
            tips.style.color="red";
            iptBor.style.borderColor = "red";
        }
    },
    validatePhone: function(tips,iptBor,con){
        if(/1[358][0-9]{9}/.test(con)){
            http.post(PATH +"/registration",param,function(err,data){
                if(!err){
                    if(data.status.code == 0){
                        tips.innerHTML = "手机号已注册，请直接登录";
                        tips.style.color="red";
                        iptBor.style.borderColor = "red";
                    }else{
                        tips.innerHTML = "手机号合法";
                        tips.style.color="green";
                        this.judge[1]=true;
                    }
                }
            })
        }else{
            tips.innerHTML = "输入格式不正确，请重新输入";
            tips.style.color="red";
            iptBor.style.borderColor = "red";
        }
    },
    validatePassword: function(tips,iptBor,con){
        if(/^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\\W].*)(?=.*[0-9\\W].*).{6,20}$/.test(con)){
            tips.innerHTML = "输入格式正确";
            tips.style.color="green";
            save = con;
            this.judge[2]=true;
        }else{
            tips.innerHTML = "输入格式不正确，请重新输入";
            tips.style.color="red";
            iptBor.style.borderColor = "red";
        }
    },
    validateRepassword: function(tips,iptBor,con){
        if(con===save){
            tips.innerHTML = "输入格式正确";
            tips.style.color="green";
            this.judge[3]=true;
        }else{
            tips.innerHTML = "密码不一致，请重新输入";
            tips.style.color="red";
            iptBor.style.borderColor = "red";
        }
    }


};


for(var i=0;i<ipt.length;i++){
    (function(k){
        addEventHandler(ipt[k],'click',function(){
            var num = 'J'+k;
            $(num).innerHTML = register.promt[k];
            $(num).style.color = "#787878";
            ipt[k].style.borderColor = "#969696";
        })
    })(i);
    addEventHandler(ipt[i],"blur",check);
}
addEventHandler($("btn-register"),'click',function(){
    for(var i=0;i<register.judge.length;i++){
        if(register.judge[i]=== false){
            alert('提交失败，重新输入');
            return;
        }
    }
    http.post(PATH +"/registration",param,function(err,data){
        if(!err && data.status.code==1){
            alert("注册成功");
        }
    })
});
function check(){
    switch(this.name){
        case 'txt-username':
            param.username = this.value;
            register.validateUsername($("J0"),this,this.value);
        break;
        case 'txt-phone':
            param.phone = this.value;
            register.validatePhone($("J1"),this,this.value);
        break;
        case 'txt-password':
            param.password = this.value;
            register.validatePassword($("J2"),this,this.value);
        break;
        case 'txt-repassword':
            register.validateRepassword($("J3"),this,this.value);
        break;
    }
}

function $(id){
    return document.getElementById(id);
}
 function addEventHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    } else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}