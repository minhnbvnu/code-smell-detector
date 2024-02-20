function getPosOfEvent(ev) {
		//多指触摸， 返回多个手势位置信息
		if (_hasTouch) {
			var posi = [];
			var src = null;

			for (var t = 0, len = ev.touches.length; t < len; t++) {
				src = ev.touches[t];
				posi.push({
					x: src.pageX,
					y: src.pageY
				});
			}
			return posi;
		} //处理PC浏览器的情况
		else {
			return [{
				x: ev.pageX,
				y: ev.pageY
			}];
		}
	}