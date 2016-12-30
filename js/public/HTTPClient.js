/**
 * Created by lenovo on 2016/12/22.
 */

(function () {

    function HTTPClient() {

    }
    //      设置导航
    HTTPClient.prototype.getJson = function (url,callback) {

        $.get(url).done(function (result) {

            if (callback){
                callback(result);
            }

        });

    };
    //      设置内容
    HTTPClient.prototype.getJsonP = function (url,data,callback) {

        $.post({url:url,dataType:"jsonp",data:data}).done(function (result) {
            if (callback){
                callback(result);
            }
        })

    };


    window.HTTPClient = HTTPClient;

})();