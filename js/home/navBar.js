
/**
 * Created by lenovo on 2016/12/22.
 */
(function () {

    function NavBar(url,superView,getItemsCallBack) {

        this.superView = superView;

        this.showNavBar(url,getItemsCallBack);

        this.items = [];

        HTTPClient.call(this);
    }

    NavBar.prototype = new HTTPClient();


    NavBar.prototype.showNavBar = function (url,getItemsCallBack) {

        this.navBar = $("<ul class='nav-container'></ul>");
        this.superView.append(this.navBar);

        var self = this;

        this.getJson(url,function (result) {

            /*console.log(result);*/

            if (!result){
                console.log("未取得数据");
                return;
            }

            var dataList = $($.parseJSON(result));
            //    json - > jquery


            dataList.each(function () {

                var item = new NavBarItem(this);
                self.navBar.append(item.li);

                // item.li.click(function () {
                //     alert(item.info.classID);
                // });

                self.items.push(item);


            });
            //      防止还未加载完数据 就去获得这个数组的时候调用
            if (getItemsCallBack){
                getItemsCallBack(self.items);
            }


        });

    };
    //      创建导航栏里面元素的类
    function NavBarItem(info) {
        //      传进来的具体数据
        this.info = info;

        this.li = $("<li>"+info.className+"</li>");
    }

    window.NavBarItem = NavBarItem;
    window.NavBar = NavBar;
})();
