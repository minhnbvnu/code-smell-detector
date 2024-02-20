function appendWeChatSDK(callback) {
	  var $weChatSDK = $('<script/>', {
	    id: 'wechat-sdk'
	  });

	  $('body').append($weChatSDK);

	  $weChatSDK.on('load', function() {
	    callback && callback();
	  }).attr('src', 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
	}