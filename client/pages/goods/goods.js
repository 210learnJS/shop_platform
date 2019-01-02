/*
作者: 周小羊
日期：2018.12.22
功能：商品详情页
*/


var goodsId={goods_id:1};
window.onload = function () {
    http.get("http://localhost:8888/goodsInfo",goodsId, function (err, data) {
        console.log(data);
        var goodsInfo=data.result[0];
        //存储选择的数据 返回给服务器
        var goodsResult = {
            goodsName: goodsInfo.goodsName,
            goodsSinglePrice: goodsInfo.goodsSinglePrice,
            goodsFare: goodsInfo.goodsFare
        }
        //存放节点
        var Dom = {
            smallImg: document.getElementById('smallImg'),

            goods_num: document.getElementById('goods-num'),
            goods_up: document.getElementById('goods-num-up'),
            goods_down: document.getElementById('goods-num-down'),

            colorSelect: document.getElementById('color-select'),
            sizeSelect: document.getElementById('size-select'),
            numSelect: document.getElementById('num-select'),
            buyNow: document.getElementById('buyNow'),
            addInto: document.getElementById('addInto')
        }
        var itemDiv = document.getElementsByClassName('select-item');
        var goodsPrice = document.getElementById('goodsPrice');
        var goodsPalce = document.getElementById('goodsPlace');
        var goodsName = document.getElementById('goodsName');

        //*********** */根据服务器发送来的数据渲染数据********/
        function init() {
            // for (var i = 0; i < goodsInfo.goodsImgUrl.length; i++) {
            //     var newImg = document.createElement('img');
            //     newImg.src = goodsInfo.goodsImgUrl[i];
            //     newImg.className = 'smallImgItem';
            //     Dom.smallImg.appendChild(newImg);
            // }
            goodsPrice.innerHTML = '¥' + goodsInfo.goodsSinglePrice;
            goodsPalce.innerHTML = goodsInfo.goodsPlace;
            goodsName.innerHTML = goodsInfo.goodsName;

            for (var i = 0; i < goodsInfo.goodsColor.length; i++) {
                var newDiv = document.createElement('div');
                newDiv.className = 'select-item';
                var newP = document.createElement('p');
                newP.className = 'block-style';
                newP.innerHTML = goodsInfo.goodsColor[i];
                newDiv.appendChild(newP);
                Dom.colorSelect.appendChild(newDiv);
            }
            for (var i = 0; i < goodsInfo.goodsSize.length; i++) {
                var newDiv = document.createElement('div');
                newDiv.className = 'select-item';
                var newP = document.createElement('p');
                newP.className = 'block-style';
                newP.innerHTML = goodsInfo.goodsSize[i];
                newDiv.appendChild(newP);
                Dom.sizeSelect.appendChild(newDiv);
            }
        }
        init();


        /************左边图片部分的交互*********** */
        var smallImgList = document.getElementsByClassName('smallImgItem');
        var bigImgItem = document.getElementById('bigImgItem');
        for (var i = 0; i < smallImgList.length; i++) {

            addEventHandler(smallImgList[i], 'mouseover', function () {
                bigImgItem.src = this.src;
                this.classList.add('smallImghover');
            });
            addEventHandler(smallImgList[i], 'mouseout', function () {
                this.classList.remove('smallImghover');
            });
        }


        //放大镜功能
        addEventHandler(bigImgItem, 'mouseover', function (e) {
            var e = e || window.event;
            var x = e.clientX;
            var y = e.clientY;
            var picX = bigImgItem.offsetLeft;
            var picY = bigImgItem.offsetTop;
            var _left = x - picX;
            var _top = y - picY;

            console.log();
            console.log('_left:' + _left + '_top:' + _top);
        });



        /***************右边部分交互********************* */

        //鼠标放上去悬浮效果
        for (var i = 0; i < itemDiv.length; i++) {
            itemDiv[i].onmouseover = function () {
                this.classList.add('hoverStyle')
            }
            itemDiv[i].onmouseout = function () {
                this.classList.remove('hoverStyle')
            }
        }
        var colorList = Dom.colorSelect.getElementsByTagName('div');
        var sizeList = Dom.sizeSelect.getElementsByTagName('div');
        //颜色选择
        for (var i = 0; i < colorList.length; i++) {
            (function () {
                addEventHandler(colorList[i], 'click', function () {
                    for (var j = 0; j < colorList.length; j++) {
                        (function (j) {
                            colorList[j].style.border = '2px solid rgb(182, 180, 180)'
                        })(j);
                    }
                    this.style.border = '2px solid red';
                    goodsResult.color = this.innerText.replace(/[\r\n]/g, "");
                })
            })(i);
        }
        //尺寸选择
        for (var i = 0; i < sizeList.length; i++) {
            (function () {
                addEventHandler(sizeList[i], 'click', function () {
                    for (var j = 0; j < sizeList.length; j++) {
                        (function (j) {
                            sizeList[j].style.border = '2px solid rgb(182, 180, 180)'
                        })(j);
                    }
                    this.style.border = '2px solid red';
                    goodsResult.size = this.innerText.replace(/[\r\n]/g, "");
                })
            })(i);
        }




        //个数加减 鼠标单击事件
        addEventHandler(Dom.goods_up, 'click', function () {
            Dom.goods_num.value = goodsNumChange('add', Dom.goods_num.value);
            goodsResult.num = Dom.goods_num.value;
            goodsResult.priceAll = goodsResult.num * goodsResult.goodsSinglePrice + goodsResult.goodsFare;
            //alert(goodsResult.price)
        });
        addEventHandler(Dom.goods_down, 'click', function () {
            Dom.goods_num.value = goodsNumChange('sub', Dom.goods_num.value)
            goodsResult.num = Dom.goods_num.value;
            goodsResult.priceAll = goodsResult.num * goodsResult.goodsSinglePrice + goodsResult.goodsFare;
            //alert(goodsResult.price)
        });
        var { PATH, PORT } = constant;
        //立即购物 此时购物的信息储存下来 返回给服务器端
        addEventHandler(Dom.buyNow, 'click', function () {
            param = goodsInfo;
            http.post(PATH + "/search", param, function (err, data) {
                if (!err && data.status.code != 0) {
                    window.location.href = 'http://localhost:8888/pages/shoppingCar/shoppingCar.html';
                } else {
                    alert("用户名不存在或密码错误，请重新输入");
                }
            })
            console.log(goodsResult);
        })
        /************通用函数*********** */
        //跨浏览器事件
        function addEventHandler(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }

        //封装一个购物加减的函数
        function goodsNumChange(type, target) {
            //购物个数加
            var num = target;
            if (type == 'add') {
                num++;
            }
            //购物减
            if (type == 'sub') {
                num--;
            }
            return num;
        }

       
         
        
        

        
    })
    var commentBox = document.getElementById("comment_box");
    http.get(PATH + "/getComment", { goods_id: 1 }, function (err, data) {
        if (!err) {
            createCommentDiv(commentBox, data);
        }
        else {
            console.log(err);
        }
    });
}
