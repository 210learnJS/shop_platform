window.onload = function(){
    var obj = {
        username: "",
        password: ""
    };
    http.get("http://localhost:8888/login", obj, function(err, data){
        if(err){
            console.error(err);
            return;
        }

        if(data.status.code == 1){
            console.log(data.result);
            //cookie.save({userCurrent: "alan", userId: "562376234"});
        }
    });
}