function LoopLine(x, y, points, width, color) {
			this._points = [];
			var tCurrX = NaN;
			var tCurrY = NaN;
			var tLastX = -1;
			var tLastY = -1;
			var tLen = points.length / 2 - 1;
			for (var i = 0; i < tLen; i++) {
				tCurrX = points[i * 2];
				tCurrY = points[i * 2 + 1];
				if (Math.abs(tLastX - tCurrX) > 0.01 || Math.abs(tLastY - tCurrY) > 0.01) {
					this._points.push(tCurrX, tCurrY);
				}
				tLastX = tCurrX;
				tLastY = tCurrY;
			}
			tCurrX = points[tLen * 2];
			tCurrY = points[tLen * 2 + 1];
			tLastX = this._points[0];
			tLastY = this._points[1];
			if (Math.abs(tLastX - tCurrX) > 0.01 || Math.abs(tLastY - tCurrY) > 0.01) {
				this._points.push(tCurrX, tCurrY);
			}
			LoopLine.__super.call(this, x, y, 0, 0, this._points.length / 2, 0, width, color);
		}