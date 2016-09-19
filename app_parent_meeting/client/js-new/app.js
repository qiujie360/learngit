'use strict';
var wxQj = {
	share: function (options) {

		wx.config(wxConfig);
		wx.ready(function () {
			// wx.hideMenuItems({
			//    menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			// });
			var opts = angular.extend({}, options);
			opts.link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7aaaa4241ca554e&redirect_uri=http%3A%2F%2Fwww.8dsun.com%2Fo.php%3Fcid%3D8aadb31e54f133b60154f1393a050023%26jump%3D0";
			if (opts.params) {
				for (var key in opts.params) {
					opts.link += ("%26" + key + "%3d" + opts.params[key]);
				}
			}
			opts.link += "&response_type=code&scope=snsapi_base&state=123";
			if (!opts.imgUrl) {
				opts.imgUrl = angular.isObject(document.images) && angular.isObject(document.images[0]) && document.images[0].src;
			}
			var shareData = opts;

			wx.onMenuShareAppMessage(shareData);
			wx.onMenuShareTimeline(shareData);

		});
	}

};
//程序地址根目录
angular.module("meetApp", [
	"ngRoute",
	"ngMessages",
	"ngSanitize",
	"meetApp.controllers",
	"meetApp.restServices",
	"JqpApp.services"
])
.constant("rcontextPath",angular.rcontextPath)//资源地址根目录
.factory('authInterceptor', ['$rootScope', '$q',function ($rootScope, $q) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				config.headers.Authorization = $rootScope.userId;
				return config;
			},
			response: function (response) {
				if (response.status === 401) {
					// handle the case where the user is not authenticated
				}
				return response || $q.when(response);
			}
		};
	}])
.run(['$rootScope', '$location','$routeParams','Jqcommon','Meet', function($rootScope, $location,$routeParams,Jqcommon,Meet) {
	var search = $location.search();
	search.uid&&(sessionStorage.uid = search.uid);
	$rootScope.uid = sessionStorage.uid;
	$rootScope.rcontextPath = angular.rcontextPath;
	$rootScope.contextPath = angular.contextPath;
	$rootScope.jqmode = search.jqmode;
	//查询用户信息
	Jqcommon.getUserData(sessionStorage.uid, function(data){
		if(data.status===1){
			$rootScope.userId = data.userId;
		}
	});
	$rootScope.$on('$routeChangeSuccess', function(evt, next, current) {
		$rootScope.bodyBg01=false;
		if(!$rootScope.fid){
			$routeParams.fid&&(sessionStorage.fid = $routeParams.fid);
			$rootScope.fid = sessionStorage.fid;
		}
		if($rootScope.schoolName===undefined){
			$rootScope.schoolName='';
			Meet.getSchoolName({fid:$rootScope.fid},function(data){
				$rootScope.schoolName = data;
			});
		}
		wx.ready(function () {
			wx.hideMenuItems({
				menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:openWithSafari","menuItem:favorite","menuItem:share:email"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});
		});
	});
	if(search.path){
		$location.path(search.path);
	}

}])
.config(["$routeProvider","$locationProvider","$httpProvider","$sceDelegateProvider",function($routeProvider,$locationProvider,$httpProvider,$sceDelegateProvider) {
	var rcontextPath =angular.contextPathDir+"client/";
	$routeProvider
		.when('/', {
			templateUrl: rcontextPath+'template/index.html?v='+angular.v,
			controller: 'IndexController'
		})
		.when('/bindErr', {
			templateUrl: rcontextPath+'template/bind-err.html?v='+angular.v,
			controller: 'BindErrController'
		})
		.when('/video/:meetingId', {
			templateUrl: rcontextPath+'template/video.html?v='+angular.v,
			controller: 'VideoController'
		})
		.otherwise({
			redirectTo: '/'
		});
	//拦截
	$httpProvider.interceptors.push('authInterceptor');
	$sceDelegateProvider.resourceUrlWhitelist(['self', "**"]);
	//通过CORS跨域请求
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(false);
	$httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);
