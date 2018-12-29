/*
作者: 周小羊
日期：2018.12.22
功能：商品详情页
*/

/** *******全局变量**************/
//服务器端传来数据 对页面进行渲染

var goodsId = { goods_id: 1 };
var GOODS_ID = goodsId.id;
window.onload = function () {
    // var goodsInfo = {
    //     goodsName: '天猫精灵 智能音箱AI语音助手蓝牙无线WiFi音响',
    //     goodsSinglePrice: 99.00,
    //     goodsFare: 10,
    //     goodsPlace: '浙江杭州',//发货地
    //     goodsColor: ['红色', '黑色'],
    //     goodsSize: ['联通版', '电信版'],
    //     goodsImgUrl: ['http://localhost:8888/pages/goods/imgs/goodsimg1.png',
    //         'http://localhost:8888/pages/goods/imgs/goodsimg2.png',
    //         'http://localhost:8888/pages/goods/imgs/goodsimg3.png',
    //         'http://localhost:8888/pages/goods/imgs/goodsimg4.png',
    //         'http://localhost:8888/pages/goods/imgs/goodsimg5.png'],
    // }
    // var goodsResult = {
    //     goodsName: goodsInfo.goodsName,
    //     goodsSinglePrice: goodsInfo.goodsSinglePrice,
    //     goodsFare: goodsInfo.goodsFare
    // }
    //存储选择的数据 返回给服务器
    // main(goodsInfo,goodsResult);

    http.get("http://localhost:8888/goodsInfo",goodsId, function (err, data) {
        console.log(data);
        var goodsInfo=data.result[0];
        var goodsResult = {
            goodsName: goodsInfo.goodsName,
            goodsSinglePrice: goodsInfo.goodsSinglePrice,
            goodsFare: goodsInfo.goodsFare
        }
        //存储选择的数据 返回给服务器
        main(goodsInfo,goodsResult);
    })


}
//主函数
function main(obj,result) {
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

    var smallImgList = document.getElementsByClassName('smallImgItem');
    var bigImgItem = document.getElementById('bigImgItem');
    var colorList = Dom.colorSelect.getElementsByTagName('div');
    var sizeList = Dom.sizeSelect.getElementsByTagName('div');

    var { PATH, PORT } = constant;
    //*********** */根据服务器发送来的数据渲染数据********/
    function init() {
        for (var i = 0; i < obj.goodsImgUrl.length; i++) {
                var newImg = document.createElement('img');
                newImg.src = obj.goodsImgUrl[i];
                newImg.className = 'smallImgItem';
                Dom.smallImg.appendChild(newImg);
            }
        goodsPrice.innerHTML = '¥' + obj.goodsSinglePrice;
        goodsPalce.innerHTML = obj.goodsPlace;
        goodsName.innerHTML = obj.goodsName;

        for (var i = 0; i < obj.goodsColor.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.className = 'select-item';
            var newP = document.createElement('p');
            newP.className = 'block-style';
            newP.innerHTML = obj.goodsColor[i];
            newDiv.appendChild(newP);
            Dom.colorSelect.appendChild(newDiv);
        }
        for (var i = 0; i < obj.goodsSize.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.className = 'select-item';
            var newP = document.createElement('p');
            newP.className = 'block-style';
            newP.innerHTML = obj.goodsSize[i];
            newDiv.appendChild(newP);
            Dom.sizeSelect.appendChild(newDiv);
        }
    }
    init();


    /************左边图片部分的交互*********** */
    
    for (var i = 0; i < smallImgList.length; i++) {

        addEventHandler(smallImgList[i], 'mouseover', function () {
            bigImgItem.src = this.src;
            this.classList.add('smallImghover');
        });
        addEventHandler(smallImgList[i], 'mouseout', function () {
            this.classList.remove('smallImghover');
        });
    }


    //放大镜功能 未完成
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
                result.color = this.innerText.replace(/[\r\n]/g, "");
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
                result.size = this.innerText.replace(/[\r\n]/g, "");
            })
        })(i);
    }




    //个数加减 鼠标单击事件
    addEventHandler(Dom.goods_up, 'click', function () {
        Dom.goods_num.value = goodsNumChange('add', Dom.goods_num.value);
        result.num = Dom.goods_num.value;
        result.priceAll = result.num * result.goodsSinglePrice + result.goodsFare;
        //alert(goodsResult.price)
    });
    addEventHandler(Dom.goods_down, 'click', function () {
        Dom.goods_num.value = goodsNumChange('sub', Dom.goods_num.value)
        result.num = Dom.goods_num.value;
        result.priceAll = result.num * result.goodsSinglePrice + result.goodsFare;
        //alert(goodsResult.price)
    });

    //立即购物 此时购物的信息储存下来 返回给服务器端
    addEventHandler(Dom.buyNow, 'click', function () {
        param = {
            "goodsId": GOODS_ID,
            "goodsColor": result.color,
            "goodsType": result.size,
            "goodsNum": result.num
        };
        http.post(PATH + "/addToCar", param, function (err, data) {
            if (!err && data.status.code != 0) {
                alert('成功');
                // window.location.href = 'http://localhost:8888/pages/shoppingCar/shoppingCar.html';
            } else {
                alert('失败');
            }
        })
        console.log(result);
    })

}



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


console.log("周小羊5");