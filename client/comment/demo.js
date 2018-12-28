/*
 * @Author: GuoWei
 * @Date: 2018-12-25 15:15:10
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-28 17:28:02
 * @Description: 
 */




document.getElementById("test").addEventListener("click", function () {
    var commentBox = document.getElementById("comment_box");
    http.get(PATH + "/getComment", { goods_id: 1 }, function (err, data) {
        if (!err) {
            createCommentDiv(commentBox, data);
        }
        else {
            console.log(err);
        }
    });

})


