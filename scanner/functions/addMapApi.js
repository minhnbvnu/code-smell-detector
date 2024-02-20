function addMapApi(callback) {
	  var $mapApi0 = $('<script />', {
	    id: 'am-map-api-0'
	  });

	  $('body').append($mapApi0);

	  $mapApi0.on('load', function() {
	    console.log('load');
	    var $mapApi1 = $('<script/>', {
	      id: 'am-map-api-1'
	    });

	    $('body').append($mapApi1);

	    $mapApi1.on('load', function() {
	      var script = document.createElement('script');
	      script.textContent = '(' + callback.toString() + ')();';
	      $('body')[0].appendChild(script);
	    }).attr('src', 'http://api.map.baidu.com/getscript' +
	      '?type=quick&file=feature' +
	      '&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002');
	  }).attr('src', 'http://api.map.baidu.com/getscript' +
	  '?type=quick&file=api&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002');

	  // jQuery 中 `load` 事件触发有问题，动态设置 src 属性才会触发 `load` 事件
	  // $mapApi0 = $('<script />', {src: 'xxx'}); 这样的写法在 Zepto.js 中则没有问题
	}