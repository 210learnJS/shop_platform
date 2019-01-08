/*
作者: 林小宇
日期：2018.12.22
功能：商品列表页
*/

// var {Path, Port} = constant;
var brand_pic_arr;
var goods_arr;
var allgoodsLength;
//商品分页常量
var perPageGoodsNum = 60;
var currPage = 1;
var navNum = 6; //页码导航显示个数 

//用于本地测试数据库
goods_arr=[{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
},{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
},{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
},{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
},{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
},{
    "pic":["images/goods_pic/xiezi1.jpg","images/goods_pic/xiezi2.jpg","images/goods_pic/xiezi3.jpg"],

    "price":"659",

    "goodsintro":"阿迪达斯官方 三叶草 椰子鞋",

                        "shopName":"阿迪达斯官方旗舰店",

                        "turnOver":"1100",

                        "judgeNumber":"890"
}]

function init(){
    var searButt = $('subButt');
    //点击“搜索”按钮 向数据库发送请求
    addHandler(searButt,"click",function(){
        if($("inputSearch").value){
            var goodsType = $("inputSearch").value;
            http.get(Path + "/goodsList" , goodsType,function(err,data){
                if(!err){
                    brand_pic_arr = data.result.brand_imagesArray;
                    goods_arr = data.result.goods_attrArray;
                    allgoodsLength = goods_arr.length;
                }
                else{
                    alert("未搜索到您需要的信息");
                }
            })
        }
    });

    //根据服务器传来的数据进行渲染页面
    if(allgoodsLength){
        var goodsList_wrapper = $('goodsList');
        var currPageGoodsArr = divideGoods(perPageGoodsNum,goods_arr,currPage);
        for(var i = 0,len=currPageGoodsArr.length ;i < len;i++){
            var perGoodsList= renderPerGoods(goodsList_wrapper,currPageGoodsArr[i],"goodsShowImg",i);
            goodsList_wrapper.appendChild(perGoodsList.wrapper);
        }

        //导航栏设置
        dividePage(goods_arr,perPageGoodsNum);


        var navList = document.getElementsByClassName("pernav");
        for(var j=0,length = navList.length;j<length;j++){
            if(j==0){
                addHandler(navList[j],"click",function(){
                    if(currPage>1){
                        currPage--;
                        dividePage(allGoodsArr,perPageGoodsNum); //导航栏变更
                        currPageGoodsArr = divideGoods(perPageGoodsNum,goods_arr,currPage);  //当前页面应当展示的商品
                        goodsList_wrapper.innerHTML = "";
                        for(var i = 0,len=currPageGoodsArr.length ;i < len;i++){
                            var perGoodsList= renderPerGoods(goodsList_wrapper,currPageGoodsArr[i],"goodsShowImg",i);
                            goodsList_wrapper.appendChild(perGoodsList.wrapper);
                        }
                    }
                    currPage--;

                })
            }
        }




    }
    
    //对缩略图点击切换商品主图
    var allthumbNailsList = $$("goods_other_img");
    for(var i=0,len = allthumbNailsList.length;i<len;i++){
       addHandler(allthumbNailsList[i],"click",function(event){
           if(event){
               var targ = event.target;
               var targ_Num = Number(targ.id);
               var broElemList = targ.parentNode.parentNode.children;  //  good_other_img   此时包括了小红三角形 序号应该取奇数才表示图片
               targ.parentNode.setAttribute("class","choosenImgwrapper");
               targ.parentNode.previousElementSibling.setAttribute("class","red-tri");
               //对每一个小三角形单独设置偏移量
               targ.parentNode.previousElementSibling.style.left = (13.2 + targ_Num*27) + "%"
               targ.setAttribute("class","choosenImg");
               for(var k=0,len=broElemList.length;k<len;k++){
                   
                   if((k%2!=0) && Math.floor(k/2)!=targ_Num ){
                       broElemList[k].setAttribute("class","goods_other_img");
                       broElemList[k].previousElementSibling.setAttribute("class","hidden")
                       broElemList[k].children[0].setAttribute("class","choosenImg");
                   }
               }

               //更改主图main_img
               var dest = event.currentTarget.parentNode.previousElementSibling;
               dest.children[0].src = targ.src;
           }

       })
    }

    
   
}


function renderPerGoods(parent_elem,perGoodsAttr,goodsShowImgName,sequence){
     if(perGoodsAttr){
         var wrapper = document.createElement("div");
         wrapper.setAttribute("class","wrapper");
         wrapper.setAttribute("id",sequence);   //为服务器传来的每一个商品添加id,第几个
         var pergoodsElem = document.createElement("div");
         pergoodsElem.setAttribute("class","pergoods");
         wrapper.appendChild(pergoodsElem);
         //主图
         var main_img = document.createElement("div");
         main_img.setAttribute("class","main_img");
         pergoodsElem.appendChild(main_img);
         var img = document.createElement("img");
         img.setAttribute("src",perGoodsAttr.pic[0]);
         img.setAttribute("id","0");
         main_img.appendChild(img);
         //缩略图
         var other_img = document.createElement("div");
         other_img.setAttribute("class","other_img");
         pergoodsElem.appendChild(other_img);
         var img_state=[];
         for(var j=0,length = perGoodsAttr.pic.length;j<length;j++){
            if(j>=0){
                img_state.push(false);
                var triangle = document.createElement("div");
                triangle.setAttribute("class","hidden");
                other_img.appendChild(triangle);
                var thumbNails_wrapper = document.createElement("div");
                thumbNails_wrapper.setAttribute("class","goods_other_img");
                if(j==0){thumbNails_wrapper.setAttribute("id","first_img");}
                other_img.appendChild(thumbNails_wrapper);
                var oth_img = document.createElement("img");
                oth_img.setAttribute("src",perGoodsAttr.pic[j]);
                oth_img.setAttribute("id",j);
                thumbNails_wrapper.appendChild(oth_img);
                

            }
         }
         //价格
         var goods_price = document.createElement("div");
         goods_price.setAttribute("class","goods_price");
         pergoodsElem.appendChild(goods_price);
         goods_price.innerHTML = "￥" + perGoodsAttr.price;
         //商品介绍
         var goods_intro = document.createElement("div");
         goods_intro.setAttribute("class","goods_intro");
         pergoodsElem.appendChild(goods_intro);
         goods_intro.innerHTML =  perGoodsAttr.goodsintro;
         //店铺
         var shop_name = document.createElement("div");
         shop_name.setAttribute("class","shop_name");
         pergoodsElem.appendChild(shop_name);
         var shopLink = document.createElement("a");
         shopLink.setAttribute("href","");
         shopLink.innerHTML = perGoodsAttr.shopName
         shop_name.appendChild(shopLink);
         //其他信息
         var other_info_wrapper = document.createElement("div");
         other_info_wrapper.setAttribute("class","other_info_wrapper");
         pergoodsElem.appendChild(other_info_wrapper);
         var turnOver = document.createElement("div");
         other_info_wrapper.appendChild(turnOver);
         turnOver.setAttribute("class","turnover");
         turnOver.innerHTML = "月成交" + `<div>  ${perGoodsAttr.turnOver}  </div>`;
         var judgement = document.createElement("div");
         other_info_wrapper.appendChild(judgement);
         judgement.setAttribute("class","judgement");
         judgement.innerHTML = "评价" + `<div>  ${perGoodsAttr.judgeNumber}  </div>`;
         var chatWW = document.createElement("div");
         chatWW.setAttribute('class',"chat");
         other_info_wrapper.appendChild(chatWW);
         var wwImg = document.createElement("img");
         chatWW.appendChild(wwImg);
         wwImg.setAttribute('src',"images/pic_logo/wangwang_03.jpg");
     }
     return {wrapper,img_state};
}

function $(id){
    return document.getElementById(id);
}

function $$(className){
    return document.getElementsByClassName(className);
}
function addHandler(elem,type,func){
    if(elem.addEventListener){
        elem.addEventListener(type,func);
    }
    else if(elem.attachEvent){
        elem.attachEvent("on"+type,func);
    }
    else{
        elem["on"+type]=handler;
    }
}

function calPageNum(allGoodsArr,perPageGoodsNum){
    return Math.ceil(allgoodsLength/perPageGoodsNum);
}

//导航栏初始化
function dividePage(allGoodsArr,perPageGoodsNum){
    var pageNum =  Math.ceil(allgoodsLength/perPageGoodsNum);
    var navWrapper = $("pageNav");
    navWrapper.innerHTML = "";
    //生成DOM节点
    var prePage = document.createElement("div");
    if(currPage == 1){
        prePage.setAttribute("class","pernav_grey");
    }
    else{
        prePage.setAttribute("class","pernav");
    }
    prePage.setAttribute("id","prePage");
    prePage.innerHTML="上一页";
    navWrapper.appendChild(prePage);
    for(var i=currPage;i<Math.min(currPage+navNum,allgoodsLength+1);i++){
        var perPageOrder = document.createElement("div");
        if(i == currPage){
            prePage.setAttribute("class","pernav_grey");
        }
        else{
            prePage.setAttribute("class","pernav");
        }
        perPageOrder.innerHTML=i;
        navWrapper.appendChild(prePage);
        
    }
    var nextPage = document.createElement("div");
    nextPage.setAttribute('class',"pernav");
    nextPage.innerHTML = "下一页";
    var skipPage = document.createElement("div");
    skipPage.innerHTML = `共${currPage}页,到第 <input type='text' id='jumpPage' value=${i}></> 页 <input type='button' value='确定' id='confirm'>`;

    
  
}


//导航栏变更
function changeNav(navList,){

}
//划分每一页的商品
function divideGoods(perPageGoodsNum,goods_arr,currPage){
   var perPageGoodsArr;
   for(var k=(currPage-1)*perPageGoodsNum;k<min(allgoodsLength,currPag*perPageGoodsNum);k++){
      perPageGoodsArr.push(goods_arr[k]);
   }
   return perPageGoodsArr;
}

window.onload = init;

