var{PATH, PORT}=constant;
var param = {
    username: "",
    realname: "",
    sex:"",
    birthday:[],
    residence:[],
}
var info = {
    show: function(obj){obj.style.display = "block";},
    hide: function(obj){obj.style.display = "none";},
    rep: function(name){
        var newStr;
        var char = "";
        for(var i=0;i<name.length-2;i++){
            char +='*';
        }
        newStr = name.substr(0,1)+char+name.substr(-1,1);
        return newStr;

    },
    add: function(obj,con){
        obj.innerHTML = this._createxxx(con);
    },
    _createxxx: function(tt){
        var list = "<option></option>";
        for(var i=0;i<tt.length;i++){
            list += `<option>${tt[i]}</option>`;
        }
        return list;
    },
    getRadioBoxValue: function(radioName){
        var obj = document.getElementsByName(radioName);
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked){
                return obj[i].value;
            }
        }
        return null;
    },
    getSelectValue: function(selectId){
        var myselect = document.getElementById(selectId);
        var index = myselect.selectedIndex;
        return myselect.options[index].text;
    }
}
//var dataName;
function $(id){return document.getElementById(id);}

/** 页面加载完从后台取默认数据*/
http.get(PATH +"/getInfo",function(err,data){
    if(!err){
        data.result.nName && ($("nickName").value = info.rep(data.result.nName));
        info.add($("province"),data.result.province);
        dataName = data.result.nName;
    }
})
//(测试)--success
// var a = "aaaaa";
// var b = ["aa","ss","dd"];
// a && ($("nickname").value = info.rep(a));
// info.add($("province"),b);
// dataName =a;

/**监听 */
$("display").onmouseover = function(){info.show($("hid"));}
$("display").onmouseleave = function(){info.hide($("hid"));}
$("main-profile").onmouseover = function(){info.show($("edit"));}  
$("main-profile").onmouseleave = function(){info.hide($("edit"));}
$("nickname").onclick = function(){$("nickName").value = dataName;}

/**保存信息 */
$("save").onclick = function(){
    //var saveArr = [ $("nickName").value, $("realName").value, info.getRadioBoxValue("sex"), [info.getSelectValue("year"),info.getSelectValue("month"),info.getSelectValue("date")],[info.getSelectValue("province"),info.getSelectValue("city"),info.getSelectValue("area")]];
    param.username=$("nickname").value;
    param.realname = $("realName").value;
    param.sex = info.getRadioBoxValue("sex");
    param.birthday = [info.getSelectValue("year"),info.getSelectValue("month"),info.getSelectValue("date")];
    param.residence = [info.getSelectValue("province"),info.getSelectValue("city"),info.getSelectValue("area")];
    http.post( PATH + "/saveInfo",param,function(err,data){
        if(!err){
            if(data.result.saveOK){
                $("cue").innerHTML = "资料保存成功";
                $("cue").className = "saveS";
            } 
        }
    })
}
/**待完善：1.市、区下拉框选择 2.昵称、真实姓名判断*/




