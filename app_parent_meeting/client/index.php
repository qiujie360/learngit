 <?php
 require($_SERVER['DOCUMENT_ROOT'].'/8dsunServer/jssdk.php');
 $hostname = 'http://' . $_SERVER['HTTP_HOST'];
 $rcontextPath =  $hostname;//'http://www.bestudy360.com'||$hostname
 $pathname = '/WebApp/app_parent_meeting/';
 $contextPathDir = $hostname . $pathname;
 $contextPath = $hostname.$pathname;
?>
<!DOCTYPE html>
<html ng-app="meetApp">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<title ng-bind="headTitle"></title>
	<script src="<?php echo $rcontextPath; ?>/CDN/zepto/1.2.0/zepto.min.js"></script>
	<script src="<?php echo $rcontextPath; ?>/CDN/zepto/1.2.0/parts/touch.min.js?v=1.2.1"></script>
	<script src="<?php echo $rcontextPath; ?>/CDN/angular/1.5.8/angular.min.js"></script>
	<script src="<?php echo $rcontextPath; ?>/CDN/angular-route/1.5.8/angular-route.min.js"></script>
	<script src="<?php echo $rcontextPath; ?>/CDN/angular-messages/1.5.8/angular-messages.min.js"></script>
	<script src="<?php echo $rcontextPath; ?>/CDN/angular-sanitize/1.5.8/angular-sanitize.min.js"></script>
	<link href="<?php echo $rcontextPath; ?>/common/client/css/public.css?v=1.0.1" rel="stylesheet" type="text/css"/>
	<link href="<?php echo $rcontextPath . $pathname; ?>client/css/style-new.css?v=test1.0.24" rel="stylesheet" type="text/css"/>
	<script type="text/javascript">
		angular.hostname = '<?php echo $hostname;?>';
		angular.contextPathDir = '<?php echo $contextPathDir;?>';
		angular.contextPath = '<?php echo $contextPath;?>';
		angular.rcontextPath = '<?php echo $rcontextPath . $pathname . 'client';?>';
		angular.v = "test1.0.10";
		var jqLite = angular.element;
		jqLite(document.getElementsByTagName('head')).append(jqLite('<base href="' + angular.contextPathDir + 'client/" />'));
	</script>
	<script src="<?php echo $contextPathDir; ?>client/js-new/app.js?v=test1.0.10"></script>
	<script src="<?php echo $contextPathDir; ?>client/js-new/controllers.js?v=test1.0.16"></script>
	<script src="<?php echo $contextPathDir; ?>client/js-new/rest-services.js?v=1.0.2"></script>
	<script src="<?php echo $hostname ?>/common/client/js/jqp-services.js?v=test1.0.1"></script>
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
	   });
    </script>
	<script>
		var html = document.getElementsByTagName('html')[0];
		var winWid = window.innerWidth || document.body && document.body.clientWidth;
		html.style.fontSize = Math.min(winWid, 640) / 640 * 100 + 'px';
	</script>
</head>
<body ng-class="{'body-bg01':bodyBg01}">
   <div ng-show="view.show">
	 <div ng-view  class="angularView"></div>
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
   <iframe ng-src="{{iframeSrc}}" style="display: none"></iframe>
</body>

</html>