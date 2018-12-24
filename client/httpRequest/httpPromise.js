function Http(){
    function getParamStr(param){
        var str = "?";
        for(var o in param){
            str += encodeURIComponent(o)+"="+encodeURIComponent(param[o])+"&";
        }
        str = str.slice(0, str.length-1);
        return str;
    }
    Http.prototype.get = function(url, param){
        var promise = new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = handler;
            xhr.open("get",url+getParamStr(param), true);
            xhr.send(null);
            function handler(){
                if(this.readyState == 4){
                    if(this.status ==200 ){
                        var obj = JSON.parse(xhr.responseText);
                        return resolve(obj);
                    }
                    else{
                        return reject(new Error("error"));
                    }
                }
            }
        });
        return promise;
    }
    Http.prototype.post = function(url, param){
        var promise = new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = handler;
            xhr.open("post",url, true);
            xhr.send(param);
            function handler(){
                if(this.readyState == 4){
                    if(this.status ==200 ){
                        var obj = JSON.parse(xhr.responseText);
                        return resolve(obj);
                    }
                    else{
                        return reject(new Error("error"));
                    }
                }
            }
        });
        return promise;
    }

    Http.prototype.jsonp = function(url, param){
        return new Promise(function(resolve, reject){
            window.handlejsonpResponse = resolve;
            var script = document.createElement("script");
            param = Object.assign({callback: "handlejsonpResponse"}, param);
            script.src = url + getParamStr(param);
            document.body.appendChild(script);
            document.body.removeChild(script);
        });
    }

    Http.prototype.cors = function(url, param){            
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
        var promise = new Promise(function(resolve,reject){
            var xhr = creatCorsRequest('GET',url+getParamStr(param));
            xhr.onload = function(){
                var text = xhr.responseText;
                return resolve(text);
            };
            xhr.onerror = function(){
                console.log('cors fail')
                return reject(new Error("error"));
            };
            xhr.send();
        });
        return promise;
    } 

}