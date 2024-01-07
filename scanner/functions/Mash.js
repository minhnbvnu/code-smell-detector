function Mash() {
	      var n = 0xefc8249d;

	      var mash = function mash(data) {
	        data = data.toString();

	        for (var i = 0; i < data.length; i++) {
	          n += data.charCodeAt(i);
	          var h = 0.02519603282416938 * n;
	          n = h >>> 0;
	          h -= n;
	          h *= n;
	          n = h >>> 0;
	          h -= n;
	          n += h * 0x100000000; // 2^32
	        }

	        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	      };

	      return mash;
	    }