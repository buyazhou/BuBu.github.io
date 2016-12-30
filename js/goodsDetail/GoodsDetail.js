/**
 * Created by 部亚洲- on 2016/12/22.
 */

(function () {

    function init() {

        console.log(location.search);
        var goodsID = location.search.replace("?","");
        //      创建GoodsView
        new GoodsView("http://datainfo.duapp.com/shopdata/getGoods.php",goodsID,$(".goods-container "))

    }



    init();


})();