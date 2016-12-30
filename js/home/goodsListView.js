/**
 * Created by 部亚洲- on 2016/12/22.
 */

(function () {

    function GoodsListView(url,data,superView,getItemsCallBack) {

        //      调用
        this.showListView(url,data,superView,getItemsCallBack);

        HTTPClient.call(this);

    }
    //      继承 HTTPClient
    GoodsListView.prototype = new HTTPClient();



    GoodsListView.prototype.showListView = function (url,data,superView,getItemsCallBack) {
        //      把数据显示在html中   创建列表元素
        this.goodsContainer = $("<ul class='goods-container'></ul>");
        superView.html(this.goodsContainer);
        var self = this;


        //      使用 HTTPClient 里面的属性
        this.getJsonP(url,data,function (result) {
            console.log(result);

            //      创建存放  商品列表的对象
            $(result).each(function () {
                var goods = new GoodsItem(this,self.goodsContainer);


            })
        })
    };

    function GoodsItem(info,superView) {
        this.info = info;
        //      找到图片的名字
        var imageName = info.goodsListImg;
        var className = info.className;
        var price = info.price;
        var goodsName = info.goodsName;
        var discount = info.discount;

        var target = "html/goodsDetail.html?"+info.goodsID+"";
        this.li = $("<li><a href="+target+"><img src="+imageName+" alt=''></a><p class='goodsName'>"+goodsName+"</p><p class='price'>￥"+price+"</p><p class='discount'>"+discount+"折</p></li>");
        superView.append(this.li);

    }


window.GoodsListView = GoodsListView;


})();