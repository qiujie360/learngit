'use strict';
angular.module("meetApp.controllers", [])
    .filter('timeToNow', [function () {
        function padZero(value) {
            for (var i = value.toString().length; i < 2; i++) {
                value = '0' + value;
            }
            return value;
        }

        return function (input) {
            var nowTime = new Date().getTime();
            var diffTime = parseInt((parseInt(input) - nowTime) / 1000);

            if (diffTime <= 0) {
                return '00:00:00';
            } else {
                var hour = parseInt(diffTime / 3600);
                var minute = parseInt((diffTime % 3600) / 60);
                var second = parseInt(diffTime % 60);
                return padZero(hour) + ':' + padZero(minute) + ':' + padZero(second);
            }
        }

    }])

    .filter('shortNum', [function () {
        return function (input) {
            if (input) {
                input = parseInt(input);
                if (input >= 10000) {
                    return (input / 10000).toFixed(1) + 'w';
                } else if (input >= 1000) {
                    return (input / 1000).toFixed(1) + 'k';
                } else {
                    return input;
                }
            } else {
                return 0;
            }
        }
    }])

    .controller("IndexController", ["$rootScope", "$scope", "$location", "$window", "Meet", function ($rootScope, $scope, $location, $window, Meet) {

        var view = ($rootScope.view = {});
        view.show = false;
        var Global = $rootScope.Global;
        $rootScope.bodyBg01 = true;
        if (!angular.isObject(Global)) {
            Global = ($rootScope.Global = {});
        }
        Global.bg02 = false;
        Global.search = {};
        var lsearch = $location.search();
        for (var key in lsearch) {
            if (angular.isArray(lsearch[key])) {
                Global.search[key] = lsearch[key][0];
            }
            else {
                Global.search[key] = lsearch[key];
            }
        }
        $rootScope.headTitle = "家长会";
        $scope.navSelect = function (index) {
            $scope.currentIndex = index;
        };
        $scope.navSelect(1);
        $scope.hostname=angular.hostname;
        var meetingList, nickname;
        Meet.getMlist({fid: Global.search.fid, uid: Global.search.uid}, function (data) {
            var meetingNum = 0, ctime;
            meetingList = data.items;
            meetingNum = data.currentNum;
            nickname = data.extendData.displayName;
            ctime = data.extendData.serverTime;//当前服务器时间
            // for (var i = 0; i < meetingList.length; i++) {
            //     var startTime = meetingList[i].startTime;
            //     var endTime = meetingList[i].endTime;
            //     var state;//0表示即将开始，1表示正在进行，2表示已结束，3表示直接查看内容
            //     if (meetingList[i].meetingType === 2) {
            //         state = 3;
            //     }
            //     else {
            //         if (ctime < startTime) {
            //             state = 0;
            //         }
            //         else if (ctime > endTime) {
            //             state = 2;
            //         }
            //         else {
            //             state = 1;
            //         }
            //     }
            //     meetingList[i].state = state;
            // }
            //分享--start
            var shareParams = {
                params: {fid: Global.search.fid},
                title: $rootScope.schoolName+"家长会",
                desc: $rootScope.schoolName+"掌上家长会"
            };
            if (meetingNum) {
                shareParams.imgUrl = meetingList[0].poster;
            }
            //分享--end
            wxQj.share(shareParams);
            $scope.meetingList = meetingList;
            $scope.ctime = ctime;
            $scope.meetingNum = meetingNum;
            view.show = true;
        });

        //会议跳转
        $scope.attOrCheck = function (mitem) {
            $rootScope.meeting = mitem;
            $rootScope.meeting.nickname = nickname;
            $location.path("/video/" + mitem.meetingId);
        };

    }])
    .controller("VideoController", ["$rootScope", "$scope", "$location", '$window', '$timeout', "Meet", "$routeParams", 'Jqp',function ($rootScope, $scope, $location, $window, $timeout, Meet, $routeParams,Jqp) {
        var view = ($rootScope.view = {});
        var Global = $rootScope.Global;
        if(Global){
            Global.bg02 = false;
        }
        else{
            Global=$rootScope.Global={};
        }
        var meetingId = $routeParams.meetingId;
        var video;
        var meeting = $rootScope.meeting;
        if(meeting){
            Jqp.setTitle(meeting.meetingName);
            video =createVideo(meeting);
            if (meeting.meetingType != 0) {
                showVideo();
            }
            else{
                verfity();
            }
        }
        else{
            Meet.getVideoDetail({meetingId:meetingId},function(data){
                if(data.status===1){
                    meeting=data.data.info;
                    meeting.nickname=data.data.displayName;
                    Jqp.setTitle(meeting.meetingName);
                }
                else{
                    meeting={};
                }
                video =createVideo(meeting);
                if (meeting.meetingType != 0) {
                    showVideo();
                }
                else{
                    verfity();
                }
            });
        }
        function createVideo(meeting){
            var nickname = meeting.nickname;
            if (nickname) {
                nickname = encodeURIComponent(nickname);
            }
            var meetingUrlList = [], videoNum = 1;
            if (meeting.state != '2') {
                meetingUrlList.push({url: meeting.attendeeJoinUrl});
            }
            else {
                if (meeting.recordList) {
                    meeting.recordList = JSON.parse(meeting.recordList);
                }
                if (angular.isArray(meeting.recordList) && meeting.recordList.length > 0) {
                    meetingUrlList = meeting.recordList;
                    videoNum = meeting.recordList.length;
                }
            }
            return {
                token: meeting.attendeeToken,
                nickname: nickname,
                urlList: meetingUrlList,
                state: meeting.state,
                num: videoNum,
                webcastId: meeting.webcastId
            };
        }

        function verfity() {
            var lsearch = $location.search();
            var seaStr = 'uid=' + lsearch.uid + '&fid=' + lsearch.fid;
            var goHref;
            var backPath = angular.hostname + '/WebApp/app_parent_meeting/client/';
            var nextPath;
            seaStr += ('&backPath=' + backPath);
            Meet.enterMeet({fid: lsearch.fid, meetingId: meeting.meetingId}, function (data) {
                $scope.clicked = false;
                if (data.status == 1) {
                    showVideo();
                }
                else {
                    var ids = data.data;
                    if (angular.isArray(ids) && ids.length == 1) {
                        nextPath = "/selectIdentity/" + lsearch.fid + '/' + ids[0].gradeId + '/' + ids[0].groupId;
                    }
                    else {
                        nextPath = '/selectClass/' + lsearch.fid;
                    }
                    if (!$rootScope.userId) {
                        seaStr += ('&nextPath=' + nextPath);
                        goHref = angular.hostname + "/WebApp/appPersonCenter/#/bindMobile/0";
                    }
                    else {
                        goHref = angular.hostname + '/WebApp/appPersonCenter/#' + nextPath;
                    }
                    $window.location.replace(goHref + "?" + seaStr);
                }
            });
        }

        function showVideo() {
            //分享--start
            var shareParams = {
                params: {fid: $location.search().fid,path:$location.path()},
                title: meeting.meetingName,
                desc: meeting.meetingName
            };
            shareParams.imgUrl = meeting.poster;
            //分享--end
            wxQj.share(shareParams);
            $scope.video = video;
            function urlAddSearch(url, keyName, keyValue) {
                if (url.indexOf(keyName) !== -1) {
                    return;
                }
                if (url.indexOf("?") === -1) {
                    url += "?";
                }
                if (url.indexOf("=") !== -1) {
                    url += "&";
                }
                url += (keyName + '=' + keyValue);
                return url;
            }

            //选择录像
            $scope.selVideo = function (oneVideo, $index) {
                $scope.cIndex = $index;
                if (!oneVideo||!oneVideo.url) {
                    Jqp.Dialog({
                        content:meeting.meetingName+'<br>直播已结束，敬请留意回放',
                        type: "fail",
                        timeoutHide: -1
                    });
                    return;
                }
                var url = urlAddSearch(oneVideo.url, "token", video.token);
                if(video.nickname){
                    url = urlAddSearch(url, "nickName", video.nickname);
                }
                $scope.meetingUrl = url;
            };
            view.show = true;
            $scope.selVideo(video.urlList[0], 0);
            $timeout(function () {
                $("#videoIframe").height($($window).height() - $("#videoXj").height());
            }, 1000)
            $("#videoIframe").height($($window).height() - $("#videoXj").height());
            $("#videoLoading").height($($window).height());

            Meet.addJoinLog(video.webcastId);
            Meet.addHitNum(video.webcastId);
        }
    }])
    .controller("BindErrController", ["$rootScope", "$scope", "$location", "Meet", function ($rootScope, $scope, $location, Meet) {
        var view = ($rootScope.view = {});
        view.show = false;
        var Global = $rootScope.Global;
        $scope.bindErr = Global.bindErr;
        delete Global.bindErr;
        Global.bg02 = false;
        view.show = true;

    }]);