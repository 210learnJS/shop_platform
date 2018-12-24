function Http(){
    function getParamStr(param){
        var str = "?";
        for(var o in param){
            str += encodeURIComponent(o)+"="+encodeURIComponent(param[o])+"&";
        }
        str = str.slice(0, str.length-1);
        return str;
    }
    function creatCorsRequest(method,url){
        var xhr = new XMLHttpRequest();
        if("withCredentials" in xhr){
            xhr.open(method,url,true);
        }else if(typeof XDomainRequest != "undefined"){
            xhr.open(method,url)
        }else{
            xhr = null
        }
        return xhr;
    }
    function isFun(callback){
        return typeof callback === "function";
    }
    Http.prototype.get = function(url, param, callback = ()=>{}){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status ==200 ){
                    var obj = JSON.parse(xhr.responseText);
                    isFun(callback)&&callback(null, obj);
                }else{
                    isFun(callback)&&callback("error");
                }
            }
        }
        xhr.open("GET",url+getParamStr(param), true);
        xhr.send(null);
    }
    Http.prototype.post = function(url, param, callback = ()=>{}){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status ==200 ){
                    var obj = JSON.parse(xhr.responseText);
                    isFun(callback)&&callback(null, obj);
                }else{
                    isFun(callback)&&callback("error");
                }
            }
        }
        xhr.open("POST",url, true);
        xhr.send(param);
    }

    Http.prototype.jsonp = function(url, param, callback = ()=>{}){
        function handleResponse(data){
            isFun(callback)&&callback(null, data);
        }
        window.handlejsonpResponse = handleResponse;
        var script = document.createElement("script");
        param = Object.assign({callback: "handlejsonpResponse"}, param);
        script.src = url + getParamStr(param);
        document.body.insertBefore(script,document.body.lastChild);
        document.body.removeChild(script);
    }

    Http.prototype.corsGet = function(url, param, callback = ()=>{}){
        var xhr = creatCorsRequest('GET',url+getParamStr(param));
        xhr.onload = function(){
            var obj = JSON.parse(xhr.responseText);
            isFun(callback)&&callback(null, obj);
        };
        xhr.onerror = function(){
            isFun(callback)&&callback("error");
        };
        xhr.send();
    } 

    Http.prototype.corsPost = function(url, param, callback = ()=>{}){
        var xhr = creatCorsRequest('POST',url);
        xhr.onload = function(){
            var obj = JSON.parse(xhr.responseText);
            isFun(callback)&&callback(null, obj);
        };
        xhr.onerror = function(){
            isFun(callback)&&callback("error");
        };
        xhr.send(param);
    } 

}