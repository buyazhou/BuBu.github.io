/**
 * Created by 部亚洲- on 2016/12/22.
 */

//      显示获得的数据
(function () {


    function GoodsView(url, id, superView) {

        this.showGoods(url, id, superView);

    }

    //      继承网络请求
    GoodsView.prototype = new HTTPClient();

    //      显示商品的方法
    GoodsView.prototype.showGoods = function (url, id, superView) {
        var self = this;

        this.getJsonP(url, {goodsID: id}, function (result) {
            console.log(result);
            //      调用
            self.createView(result[0], superView);

            self.addClick();
            self.chooseSize();
            self.bigAndSmall();
            self.QrCodeBlock();
            self.SuckTheTop();
            self.clickBtn();
        });

    };
    //      选择尺寸
    GoodsView.prototype.chooseSize = function () {
        $(".size_s,.size_m,.size_l").click(function () {
            this.style.backgroundImage = 'url(../images/gou.png)';
        })
    };
    //      点击
    GoodsView.prototype.clickBtn = function () {
        $(".car").click(function () {
            alert("此功能暂未实现~ 敬请期待")
        });
        $(".buy").click(function () {
            alert("此功能暂未实现~ 敬请期待")
        });
        $(".search_btn1").click(function () {
            alert("此功能暂未实现~ 敬请期待")
        });

    }

    //      增加数量按钮
    GoodsView.prototype.addClick = function () {
        $(document).ready(function () {
            //加的效果
            $(".add").click(function () {
                var n = $(this).prev().val();
                var num = parseInt(n) + 1;
                if (num == 0) {
                    return;
                }
                $(this).prev().val(num);
            });
            //减的效果
            $(".jian").click(function () {
                var n = $(this).next().val();
                var num = parseInt(n) - 1;
                if (num == 0) {
                    return
                }
                $(this).next().val(num);
            });
        })
    };
    //      二维码
    GoodsView.prototype.QrCodeBlock = function () {
        $(".phone_scanning").mouseenter(function () {
            $(".QrCode").css('display','block',function () {
                this.hide(1000);
            })
        });
        $(".phone_scanning").mouseleave(function () {
            $(".QrCode").css('display','none')
        })
    };
    //      吸顶菜单
    GoodsView.prototype.SuckTheTop = function () {
        $(document).scroll(function () {
            var self = $(this);
            var nav = $("#pageNavigation");
            var x = self.scrollTop();
            if (x>800 && x<6600){
                self.css('display','block');
                $("#ShowPageNavigation").css('display','none');
                nav.fadeIn();
            }else{
                $("#ShowPageNavigation").css('display','block');
                self.css('display','none');
                nav.fadeOut();
            }
        });
    }
    /*个人中心*/
    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getuser.php",
        data:{userID:localStorage.getItem("userID")},
        dataType:"JSONP",
        success:function(data){
            console.log(data);
            data = data[0];
            $(".userInfo").empty();
            $html ='<div class="userInfo-header"></div><div class="userInfo-txt"> <h5>尊敬的 '+data.userID+' 欢迎您</h5></div>';
            $(".userInfo").append( $html);
        }
    });
    //      放大镜和缩略图效果
    GoodsView.prototype.bigAndSmall = function () {
        var box=document.getElementById("box");
        var Big=document.getElementById("big");
        var Small=document.getElementById("small");
        var fdj=document.getElementById("fdj");
        var BigLi=Big.getElementsByTagName("li");
        var SmallLi=Small.getElementsByTagName("li");
        var FdjLi=fdj.getElementsByTagName("li");
        var _index=0;

        for(var i=0; i<SmallLi.length; i++){
            SmallLi[i].index=i;
            SmallLi[i].onmouseover=function(){
                for(var i=0; i<SmallLi.length; i++){
                    SmallLi[i].className="";
                    BigLi[i].className="";
                    FdjLi[i].className="";
                }
                this.className="cur";
                BigLi[this.index].className="cur";
                FdjLi[this.index].className="cur";
                _index=this.index;
            }
        }

        var shade=document.getElementById("shade");
        var mask=document.getElementById("mask");

        shade.onmouseover=function(){
            mask.style.display="block";
            fdj.style.display="block";
        };
        shade.onmouseout=function(){
            mask.style.display="none";
            fdj.style.display="none";
        };

        shade.onmousemove=function(event){

            var event=event||window.event;

            var x=event.clientX;  //鼠标与浏览器X轴(左)的坐标（距离）
            var y=event.clientY;  //鼠标与浏览器Y轴（上）的坐标（距离）

            var l=box.offsetLeft; //获区big与浏览器窗口左边距离
            var t=box.offsetTop;  //获区big与浏览器窗口上边距离

            var w=mask.offsetWidth/2;
            var h=mask.offsetHeight/2+4;

            var _left=x-l-w;  //透明小滑块左边的距离
            var _top=y-t-h;   //透明小滑块上面的距离


            //做判断，不能让透明区块移出去
            if(_top<0){ //不从上面和下面出去
                _top=0
            }else if(_top>Big.offsetHeight-2*h){
                _top=Big.offsetHeight-2*h;
            };

            if(_left<0){//不让从左边和右边出去
                _left=0
            }else if(_left>Big.offsetWidth-2*w){
                _left=Big.offsetWidth-2*w
            };

            mask.style.left=_left+"px";
            mask.style.top=_top+"px";

            var ydmax_w=Big.offsetWidth-2*w; //透明滑块能滑动最大的宽度
            var ydmax_h=Big.offsetHeight-2*h;//透明滑块能滑动最大的高度

            var yd_wbl=_left/ydmax_w; //滑动宽度的比例
            var yd_hbl=_top/ydmax_h;  //滑动高度的比例

            var fImg=fdj.getElementsByTagName("img");


            var b_left=(fImg[_index].offsetWidth-fdj.offsetWidth)*yd_wbl+10; //大图对应的左边的距离
            var b_top=(fImg[_index].offsetWidth-fdj.offsetWidth)*yd_hbl;  //大图对应的上面的距离

            fImg[_index].style.left=-b_left+"px";
            fImg[_index].style.top=-b_top+"px";
        }



    };



    GoodsView.prototype.createView = function (info, superView) {

        var string = info.imgsUrl;
        var string_b = info.goodsBenUrl;
        /**
         * split 转换成数组形式
         */
        var images = string.slice(2, info.imgsUrl.length - 2).split("\",\"");
        var images_b= string_b.slice(2, info.goodsBenUrl.length - 2).split("\",\"");
        //      console.log(images);
        //      展示

        superView.append("<div id='nav'><ul class='nav_ul'><li>首页</li><li>新品</li><li>男士</li><li>女士</li><li>品牌</li><li style='color: red;'>发现</li><li>专题</li><li>手机</li></ul></div>");

        superView.append("<header class='top-container'><p style='display: none'>欢迎您</p><ul class='top-user'> <li class='userInfo'></li></ul><div id='logo'><a href=../index.html><img class='logo' src=../images/logo.gif alt=''></a> </div><div id='search'> <a href='#' class='search_btn1'></a> <input type='text' name='search' placeholder='搜索你想要的东西'></div><nav class='navBar'></nav></header>");

        superView.append("<div id='container'>	<div id='box'> " +
            "<div id='big'>" +
                "<ul>" +
                    "<li class='cur'><img src="+images[0]+" alt=''></li> " +
                    "<li><img src="+images[1]+" alt=''></li> " +
                    "<li><img src="+images[2]+" alt=''></li> " +
                "</ul> " +
            "<div id='mask'></div> " +
            "<span id='shade'></span> </div> " +
            "<div id='small'> " +
                "<ul> " +
                    "<li class='cur'><img src="+images[0]+" alt=''></li> " +
                    "<li><img src="+images[1]+" alt=''></li> " +
                    "<li><img src="+images[2]+" alt=''></li> " +
                "</ul> " +
            "</div> " +
            "<div id='fdj'> " +
                "<ul> " +
                    "<li class='cur'><img src="+images[0]+" alt=''></li> " +
                    "<li><img src="+images[1]+" alt=''></li> " +
                    "<li><img src="+images[2]+" alt=''></li> " +
                "</ul> " +
            "</div> </div>"+
            "<div id='goods'><h3 class='title'>" + info.goodsName + "</h3>" + "<div id='goods-prowrap'>" +
            "<div id='font-size'>限时折扣:<b class=discount>" + info.discount + "折</b></div>" +
            "<div id='font-size'><p class='font-size'>价格：<b class='price'>" + info.price + "</b></p></div>" +
            "<div id='font-size'><p class='font-size'>促销价：<b class='buyNumber'>￥" + info.buynumber + "</b></p></div>" +
            "<div id='font-size'><p class='font-size'> 店铺优惠:<b> " + info.discountTime + "</b></p></div></div>" +
            "<a class='kf' href='#'></a>" +
            "<div class='size'><p class='font-size'>尺码：</p>" +
            "<li class='size_s'>S</li> " +
            "<li class='size_m'>M</li> " +
            "<li class='size_l'>L</li> " +
            "</div>" +
            "<div id='Num'><p class='font_d'>数量：</p><div class='Num'><em class='jian'>-</em><input type='text' value='1' class='num'> <em class='add'>+</em></div></div>" +
            "<div id='buyAndCar'><a href='#'><div class='buy'> 立即购买</div></a>" +
            "<a href='#'><div class='car'>加入购物车</div></a></div>" +
            "<div id='features'><ul class='font-size'>商品特色：<li> <img src='../images/01.png' alt=''>正版授权</li><li><img src='../images/02.png' alt=''>实拍认证</li></ul></div>" + "<div id='commitment'><ul class='font-size'>服务承诺：<li><img src='../images/03.png' alt=''>退货补运费</li><li><img src='../images/04.png' alt=''>7天无理由退货</li><li><img src='../images/05.png' alt=''>劣一赔三服务</li><li><img src='../images/06.png' alt=''>72小时发货</li><li><img src='../images/07.png' alt=''> 全国包邮</li></ul></div>" +
            "<div id='pay'><p class='font-size'>支付方式：</p><div class='img_list'></div></div>"+
            "</div>"+"<div id='hr'></div>"+"<div id='right_selling'><div class='selling_a'>热卖推荐</div><a href=''><div class='selling_img_a'></div></a><p class='selling_price'>￥314.00</p><a href=''><div class='selling_img_b'></div></a><p class='selling_price'>￥128.00</p></div>");
            /*隐藏层*/superView.append("<div id='pageNavigation'><ul><li class='page_contact'>CITI花旗 <img src='http://s18.mogucdn.com/p1/150915/upload_iezggojsgfrwinlbgmzdambqmmyde_16x17.gif' alt=''> </li><li class='page_a_a'>商品详情</li> <li class='page_a'>累计评价</li> <li class='page_a'>本店同类推荐</li> <li class='phone_scanning'>手机扫码下单▒ <a href=''><p class='QrCode'><img class='QrCode_img' src='http://www.mogujie.com/trade/item_detail/qrcode?url=http%3A%2F%2Fweixin.meilishuo.com%2Fwx%2Fdetail%2F1h3d0ys' alt=''></p></a></li></ul><div class='shopping_cart'>🚚加入购物车 <ul><a href=''><li><span>☛</span>商品描述</li></a><a href=''><li><span>☛</span>产品参数</li></a><a href=''><li><span>☛</span>穿着效果</li></a><a href=''><li><span>☛</span>整体款式</li></a><a href=''><li><span>☛</span>细节做工</li></a><a href=''><li><span>☛</span>尺码说明</li></a><a href=''><li><span>☛</span>商品推荐</li></a></ul></div></div>");

            /*显示层*/superView.append("<div id='ShowPageNavigation'><ul><li class='page_contact'>CITI花旗 <img src='http://s18.mogucdn.com/p1/150915/upload_iezggojsgfrwinlbgmzdambqmmyde_16x17.gif' alt=''> </li><li class='page_a_a'>商品详情</li> <li class='page_a'>累计评价</li> <li class='page_a'>本店同类推荐</li> <li class='phone_scanning'>手机扫码下单▒ <a href=''><p class='QrCode'><img class='QrCode_img' src='http://www.mogujie.com/trade/item_detail/qrcode?url=http%3A%2F%2Fweixin.meilishuo.com%2Fwx%2Fdetail%2F1h3d0ys' alt=''></p></a></li></ul><div class='shopping_cart'>🚚加入购物车 <ul><a href=''><li><span>☛</span>商品描述</li></a><a href=''><li><span>☛</span>产品参数</li></a><a href=''><li><span>☛</span>穿着效果</li></a><a href=''><li><span>☛</span>整体款式</li></a><a href=''><li><span>☛</span>细节做工</li></a><a href=''><li><span>☛</span>尺码说明</li></a><a href=''><li><span>☛</span>商品推荐</li></a></ul></div></div>");

            /*店铺评价*/superView.append("<div id='section_background'> <div id='box_score'> <div class='score'><ul> <li><p class='score_text'>描述</p><p class='score_num'>4.35</p></li>  <li><p class='score_text'>价格</p><p class='score_num'>4.55</p></li>  <li><p class='score_text'>质量</p><p class='score_num'>4.68</p></li>  <li><p class='score_text'>服务</p><p class='score_num'>4.95</p></li></ul></div> <div id='showButtons'><a href='#'><button class='score_btn'>收藏店铺</button></a><a href='#'><button class='score_btn'>进入店铺</button></a></div> <div id='LuckyDraw'> <input class='LuckyDraw_inputText' type='text' placeholder='抽奖'><input class='LuckyDraw_inputButton' type='submit' value='站内搜索'></div></div>  <div id='classification'><span class='classification_span'>本店分类</span><ul><li><a href=''>全部商品</a></li><li><a href=''>衬衫</a></li><li><a href=''>连衣裙</a></li><li><a href=''>裤子</a></li><li><a href=''>卫衣</a></li><li><a href=''>T恤</a></li><li><a href=''>马甲</a></li><li><a href=''>针织衫</a></li><li><a href=''>半身裙</a></li><li><a href=''>羽绒棉服</a></li><li><a href=''>秋冬外套</a></li><li><a href=''>毛呢外套</a></li><li><a href=''>羽绒服</a></li></ul></div> " +
            "<div id='GoodsDetails'> <div class='GoodsDescribe'> <div class='Goods_h3'><h3 >商品描述</h3></div><p class='GoodsDescribe_p'>"+ info.goodsName + "</p></div> <div class='GoodsParameter'> <div class='Goods_h3'><h3 >产品参数</h3></div><p class='GoodsParameter_p'>类型："+info.className+"</p> <p class='GoodsParameter_p'>介绍："+info.detail+"</p></div> <div class='GoodsEffect'><div class='Goods_h3'><h3 >穿着效果</h3></div><li><img src="+images_b[0]+" alt=''></li><li><img src="+images_b[1]+" alt=''></li><li><img src="+images_b[2]+" alt=''></li><li><img src="+images[0]+" alt=''></li><li><img src="+images[1]+" alt=''></li><li><img src="+images[2]+" alt=''></li></div>         </div>  </div>");
            /*页脚*/
            superView.append("<hr style='background-color: #000000;height: 2px;'><footer id=bottom-container><div class=foot_one_a><div class=img><img src=../images/2014052815001.png></div><dl><dd><a href='#'><img src=../images/2014052815002.png></a><h4>支付方式</h4><p><a href='#'>在线支付</a></p><p><a href='#'>货到付款</a></p><p><a href='#'>发票说明</a></p><dd><a href='#'><img src=../images/2014052815003.png></a><h4>售后服务保障</h4><p><a href='#'>退货说明</a></p><p><a href='#'>服务承诺</a></p><dd><a href='#'><img src='../images/2014052815004.png'></a><h4>物流配送</h4><p><a href='#'>合作快递</a></p><p><a href='#'>运费说明</a></p><p><a href='#'>配送时间</a></p><dd><a href='#'><img src='../images/2014052815005.png'></a><h4>会员服务</h4><p><a href='#'>级别和特权</a></p><p><a href='#'>积分政策</a></p></dl></div><div id=foot_two><div class=foot_two_a><p class=foot_two_a_a><a href='#'>关于CITI</a><a href='#'>CITI资讯</a><a href='#'>联系CITI</a><a href='#'>人才招聘</a><a href='#'>免责条款</a><a href='#'>法律声明</a><a href='#'>意见反馈</a><a href='#'>全部分类</a><a href='#'>友情链接</a><a href='#'>尺寸对照表</a><a href='#'>问答咨询标签主题</a><a href='#'>品牌大全</a><a href='#'>商品大全</a></p><p class=foot_two_a_b>Copyright © 2008-2014<a href='#'>CITI</a>All Rights Reserved.<a href='#'>闽ICP备08106896号</a><a href='#'>经营许可证闽B2-20110061</a><a href='#'>闽公网安备 35020602000166号</a></p><p class=foot_two_a_c><a href='#'><img src='../images/2014052815006.png'></a><a href='#'><img src='../images/2014052815007.png'></a><a href='#'><img src='../images/20140528150010.png'></a><a href='#'><img src='../images/sm_124x47.png'></a><a href='#'><img src='../images/201409101718cnnic.png'></a></p></div></div></footer>");
    };


    window.GoodsView = GoodsView;

})();