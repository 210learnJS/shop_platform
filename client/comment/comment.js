/*
 * @Author: GuoWei
 * @Date: 2018-12-28 17:27:20
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-28 17:27:57
 * @Description:  评论模块
 */


var { PATH, PORT } = constant;
function formDate(date) {
    return date.slice(0,10)+"  "+date.slice(11,19);
}
function createCommentDiv(parEle, obj) {
    let commnetList = obj.result;
    var commentdivList = document.createElement('div');
    if (commnetList == null) {
        return;
    }
    parEle.innerHTML = "";
    var str = "";
    for (let i in commnetList) {
        console.log(typeof commnetList[i].comment_date);
        str += `<tr>
            <td class="comment_detail">
            <p>
            ${commnetList[i].comment_detail}
            </p>
            <div class="c-photo">

            </div>
            <div class="c-date">
                 ${formDate( commnetList[i].comment_date)}
            </div>
            </td>
            <td class="goods_detail">
            ${commnetList[i].goods_detail}
            </td>
            <td class="user_ame">
                <p>${commnetList[i].user_name}</p>
                <p>超级会员</p>
            </td>
        </tr>`;

    }
    commentdivList.innerHTML = `<table>${str}</table>`;
    parEle.appendChild(commentdivList);
}