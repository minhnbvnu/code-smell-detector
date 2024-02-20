function addBdMap() {
	  // 如果使用 $ 选择符，minify 以后会报错: $ is undefined
	  // 即使传入 $ 也无效，改为使用原生方法
	  // 这个函数作为 callback 会插入到 body 以后才执行，应该是 $ 引用错误导致
	  var content = document.querySelector('.am-map');
	  var defaultLng = 116.331398; // 经度默认值
	  var defaultLat = 39.897445;  // 纬度默认值
	  var name = content.getAttribute('data-name');
	  var address = content.getAttribute('data-address');
	  var lng = content.getAttribute('data-longitude') || defaultLng;
	  var lat = content.getAttribute('data-latitude') || defaultLat;
	  var setZoom = content.getAttribute('data-setZoom') || 17;
	  var icon = content.getAttribute('data-icon');

	  var map = new BMap.Map('bd-map');

	  // 实例化一个地理坐标点
	  var point = new BMap.Point(lng, lat);

	  // 设初始化地图, options: 3-18
	  map.centerAndZoom(point, setZoom);

	  // 添加地图缩放控件
	  if (content.getAttribute('data-zoomControl')) {
	    map.addControl(new BMap.ZoomControl());
	  }

	  // 添加比例尺控件
	  if (content.getAttribute('data-scaleControl')) {
	    map.addControl(new BMap.ScaleControl());
	  }

	  // 创建标准与自定义 icon
	  var marker = new BMap.Marker(point);
	  if (icon) {
	    marker.setIcon(new BMap.Icon(icon, new BMap.Size(40, 40)));
	  }

	  var opts = {
	    width: 200,     // 信息窗口宽度
	    // height: 'auto',     // 信息窗口高度
	    title: name // 信息窗口标题
	  };

	  // 创建信息窗口对象
	  var infoWindow = new BMap.InfoWindow('地址：' + address, opts);

	  // 创建地址解析器实例
	  var myGeo = new BMap.Geocoder();

	  // 判断有没有使用经纬度
	  if (lng == defaultLng && lat == defaultLat) {
	    // 使用地址反解析来设置地图
	    // 将地址解析结果显示在地图上,并调整地图视野
	    myGeo.getPoint(address, function(point) {
	      if (point) {
	        map.centerAndZoom(point, setZoom);
	        marker.setPosition(point);
	        map.addOverlay(marker);
	        map.openInfoWindow(infoWindow, point); // 开启信息窗口
	      }
	    }, '');

	  } else {
	    // 使用经纬度来设置地图
	    myGeo.getLocation(point, function(result) {
	      map.centerAndZoom(point, setZoom);
	      marker.setPosition(point);
	      map.addOverlay(marker);
	      if (address) {
	        map.openInfoWindow(infoWindow, point); // 开启信息窗口
	      } else {
	        map.openInfoWindow(new BMap.InfoWindow(address, opts), point); // 开启信息窗口
	      }
	    });
	  }
	}