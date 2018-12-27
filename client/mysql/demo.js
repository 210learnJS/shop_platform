/*
 * @Author: GuoWei
 * @Date: 2018-12-25 15:15:10
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-25 17:34:41
 * @Description: 
 */


function createCommentDiv(parEle, commnetList) {
    var commentdivList = document.createElement('div');
    if (commnetList == null) {
        return;
    }
    var str = "";
    commnetList.forEach((element) => {
        str += `<li>
      <div class="comment">
          <div class="comment_detail">
          ${element.comment_detail}
          </div>
          <div class="good_detail">
          ${element.goods_detail}
          </div>
          <div class="user_name">
              <p>${element.user_name}</p>
              <p>超级会员</p>
          </div>
      </div>
  
  </li>`;


    });
    commentdivList.innerHTML = `<ul>${str}</ul>`;
    console.log(str);
    parEle.appendChild(commentdivList);
}

document.getElementsByTagName('input')[0].addEventListener("click", function () {
    console.log("111");
    http.get("http://localhost:" + "/mysql/test.html", { id: 2 }, function (err, data) {
        if (!err) {
            console.log(data);           
        }
    });
});
