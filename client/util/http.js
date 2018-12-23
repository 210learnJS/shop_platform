/*
作者: 方婷
日期：2018.12.22
功能：封装前端Http请求接口
*/

function Http(){

    function getParamStr(param){
        var str = "?";
        for(var o in param){
            str += encodeURIComponent(o)+"="+encodeURIComponent(param[o])+"&";
        }
        str = str.slice(0, str.length-1);
        return str;
    }

    Http.prototype.get = function(url, param, callback = ()=>{}){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200 ){
                    var obj = JSON.parse(xhr.responseText);
                    callback(null, obj);
                }
                else{
                    callback("error");
                }
            }
        }
        xhr.open("get",url+getParamStr(param), true);
        xhr.send(null);
    }

    Http.prototype.post = function(url, param, callback = ()=>{}){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status ==200 ){
                    var obj = JSON.parse(xhr.responseText);
                    callback(null, obj);
                }
                else{
                    callback("error");
                }
            }
        }
        xhr.open("post",url, true);
        xhr.send(param);
    }

    Http.prototype.jsonp = function(url, param, callback = ()=>{}){
        function handleResponse(response){
            console.log(response);
        }
        var scriptHandleResponse = document.createElement("script");
        scriptHandleResponse.innerHTML = handleResponse;
        document.body.insertBefore(scriptHandleResponse, document.body.firstChild);

        var script = document.createElement("script");
        param = Object.assign({callback: "handleResponse"}, param);
        script.src = url + getParamStr(param);
        document.body.insertBefore(script,document.body.lastChild);
        
        document.body.removeChild(scriptHandleResponse);
        document.body.removeChild(script);
    }

    Http.prototype.cors = function(url, param, callback = ()=>{}){
        
        function creatCorsRequest(method,url){
            var xhr = new XMLHttpRequest();
            
            if("withCredentials" in xhr){
                xhr.open(method,url,true);
            }else if(typeof XDomainRequest != "undefined"){
                xhr.open(method,url)
            }else{
                xhr = null
            }
            // xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
            // xhr.setRequestHeader('Content-Type', 'application/xml');

            return xhr;
        }
        var xhr = creatCorsRequest('GET',url+getParamStr(param));
        xhr.onload = function(){
            var text = xhr.responseText;
            console.log('cors success')
            callback(null, text);
        };
        xhr.onerror = function(){
            console.log('cors fail')
            callback("error");
        };
        xhr.send();
    } 

}

var http = new Http();
