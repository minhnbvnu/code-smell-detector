function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = g.location.search.substr(1).match(reg);
				if (r != null) return decodeURIComponent(r[2]);
				return "";
			}