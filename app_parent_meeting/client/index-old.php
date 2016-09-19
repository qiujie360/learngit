 <?php
 require($_SERVER['DOCUMENT_ROOT'].'/8dsunServer/jssdk.php');
?>
<!DOCTYPE html>
<html ng-app="meetApp">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<title ng-bind="headTitle"></title>
	 <script src="http://8dsun.oss-cn-hangzhou.aliyuncs.com/PubJsLib%2Fzepto.min.js"></script>
	<!-- <link href="http://8dsun.oss-cn-hangzhou.aliyuncs.com/app_activity%2Fclient%2Fcss%2Fwxact.min.css"  rel="stylesheet" type="text/css" /> -->
	<script src="http://8dsun.oss-cn-hangzhou.aliyuncs.com/PubJsLib%2Fangular.min.js"></script>
	
	<link href="css/style.css?v=014589"  rel="stylesheet" type="text/css" />
	<!--<script src="js/scripts.js"></script>
	<script src="lib/angular.js"></script>
	<script src="lib/angular-route.js"></script>
	<script src="lib/angular-messages.js"></script>
	<script src="lib/angular-sanitize.js"></script>
	 -->
	<script src="js/app.js?v=014227"></script>
    <script src="js/controllers.js?v=028885"></script>
    <script src="js/rest-services.js?v=014589"></script>
	<script type="text/javascript">
    angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));
    </script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"> </script>
    <script type="text/javascript">
     var  wxConfig = {
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
            'checkJsApi',
            'hideMenuItems',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'openLocation',
            'getLocation'
        ]
      };
	  wx.config(wxConfig);
	  wx.ready(function() {
		   wx.hideMenuItems({
			   menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		   });
	   })
    </script>
</head>
<body ng-class="{'bg02':Global.bg02}">
   <div ng-show="view.show">
	 <div ng-view></div>
   </div>
   <div ng-if="view.error" ng-bind="view.error">
   </div>
   <div class="loading-tip vmhc" ng-if="!view.show&&!view.error">
       <div class="spinner">
		  <div class="spinner-container container1">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
		  <div class="spinner-container container2">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
		  <div class="spinner-container container3">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
	 </div>
   </div>
   <script type="text/javascript" src="http://www.8dsun.com/common/client/js/public-after.js"></script>
</body>

</html>