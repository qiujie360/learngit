(function (angular) {
    'use strict';
//上下文路径
    var contextPath = angular.contextPath;
    var hostname = angular.hostname;

    function dateStrToDate(dateStr) {
        var temp = dateStr, time, date = null;
        if (typeof temp === "string") {
            temp = temp.replace(/\s*\-\s*/g, "/").replace(/^\s*\s*^/g, "");
        }
        time = Date.parse(temp);
        if (!isNaN(time)) {
            date = new Date(time);
        }
        return date;
    }

    angular.module("meetApp.restServices", [])
        .factory("Meet", ["$http", "Jqp", function ($http, Jqp) {
            return {
                getMlist: function (params, callback) {//会议列表
                    Jqp.scrpage({
                        method: "get",
                        params: params,
                        dataKey: "meetList",
                        url: hostname + "/WebApp/appApi/index.php?module=ParentMeeting&action=meetList",
                        callback: function (scrpage) {
                            var data = scrpage;
                            callback(data);
                        }
                    });
                    return null;
                },
                enterMeet: function (params, callback) {//是否
                    $http({
                        method: "get",
                        params: params,
                        url: hostname + "/WebApp/appApi/index.php?module=ParentMeeting&action=enterMeet"
                    }).success(function (data) {
                        callback(data);
                    });
                    return null;
                },
                getVideoDetail: function (params, callback) {//是否
                    $http({
                        method: "get",
                        params: params,
                        url: hostname + "/WebApp/appApi/index.php?module=ParentMeeting&action=meetingDetail"
                    }).success(function (data) {
                        callback(data);
                    });
                    return null;
                },
                addJoinLog: function (webcastId) {
                    $http({
                        method: 'get',
                        params: {'webcastId': webcastId},
                        url: hostname + '/WebApp/app_sun_live/server/index.php?action=addJoinLog'
                    });
                },
                addHitNum: function (webcastId) {
                    $http({
                        method: 'get',
                        params: {'webcastId': webcastId},
                        url: hostname + '/WebApp/app_sun_live/server/index.php?action=addHitNum'
                    });
                },
                getSchoolName: function (params, callback) {//学校名称
                    $http({
                        method: "get",
                        params: params,
                        url: hostname + "/WebApp/appApi/index.php?module=desk&action=schoolName"
                    }).success(function (data) {
                        if (angular.isObject(data) && data.status === 1) {
                            callback(data.data.schoolName);
                        }
                        else {
                            callback('');
                        }
                    });
                }
            };
        }]);


})(window.angular);
