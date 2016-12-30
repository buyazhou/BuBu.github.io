/**
 * Created by lenovo on 2016/12/21.
 */
(function () {

    function init() {
        //      默认显示
        showContent("1");

        new NavBar("http://datainfo.duapp.com/shopdata/getclass.php", $(".navBar"), function (items) {
            $(items).each(function () {
                console.log(this);
                var self = this;
                this.li.click(function () {
                    //      alert(self.info.classID);
                    showContent(self.info.classID);
                });
            })
        });


    }


    function showContent(classID) {
        new GoodsListView("http://datainfo.duapp.com/shopdata/getGoods.php", {classID: classID}, $(".main-container"));
    }




    function Image() {
        showImage();
    }

    (function () {
        $(document).scroll(function () {
            var self = $(this);
            var nav = $("#nav");
            if (self.scrollTop() > 600) {
                nav.fadeIn();
            } else {
                nav.fadeOut();
            }

        });



    })();
    //      user
    //    根据本地存储userID发送ajax请求
    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getuser.php",
        data:{userID:localStorage.getItem("userID")},
        dataType:"JSONP",
        success:function(data){
            data.userID = null;
            console.log(data);
            data = data[0];
            $(".userInfo").empty();
            $html ='<div class="userInfo-header"></div><div class="userInfo-txt"> <h5>欢迎您：'+data.userID+'</h5></div>';
            $(".userInfo").append( $html);
        }
    });

    //      个人中心 鼠标触发事件
    function user_center() {
        $(".menu").mouseenter(function () {
            $("li.a").slideDown();
        });
        $(".top-container").mouseleave(function () {
            $("li.a").hide(1000);
        });
    }

    user_center();
    init();

})();