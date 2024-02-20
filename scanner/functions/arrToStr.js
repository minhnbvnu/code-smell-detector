function arrToStr() {
	            	function fromByteArray(t) {
	            		var u = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"]


	            		function aa(t) {

				            return u[t >> 18 & 63] + u[t >> 12 & 63] + u[t >> 6 & 63] + u[63 & t]
				        }


	            		function s(t, e, n) {
				            for (var i, r = [], o = e; o < n; o += 3)
				                i = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]),
				                r.push(aa(i));
				            return r.join("")
				        }



			            for (var e, n = t.length, i = n % 3, r = "", o = [], a = 16383, l = 0, c = n - i; l < c; l += a)
			                o.push(s(t, l, l + a > c ? c : l + a));
			            return 1 === i ? (e = t[n - 1],
			            r += u[e >> 2],
			            r += u[e << 4 & 63],
			            r += "==") : 2 === i && (e = (t[n - 2] << 8) + t[n - 1],
			            r += u[e >> 10],
			            r += u[e >> 4 & 63],
			            r += u[e << 2 & 63],
			            r += "="),
			            o.push(r),
			            o.join("")
			        }


	            	function k(t, e, n) {
		                return 0 === e && n === t.length ? fromByteArray(t) :fromByteArray(t.slice(e, n))
		            }


	            	function y(t, e, n) {
		                var i = !1;
		                if ((void 0 === e || e < 0) && (e = 0),
		                e > this.length)
		                    return "";
		                if ((void 0 === n || n > this.length) && (n = this.length),
		                n <= 0)
		                    return "";
		                if (n >>>= 0,
		                e >>>= 0,
		                n <= e)
		                    return "";
		                for (t || (t = "utf8"); ; )
		                    switch (t) {
		                    case "hex":
		                        return L(this, e, n);
		                    case "utf8":
		                    case "utf-8":
		                        return O(this, e, n);
		                    case "ascii":
		                        return D(this, e, n);
		                    case "latin1":
		                    case "binary":
		                        return I(this, e, n);
		                    case "base64":
		                        return k(this, e, n);
		                    case "ucs2":
		                    case "ucs-2":
		                    case "utf16le":
		                    case "utf-16le":
		                        return E(this, e, n);
		                    default:
		                        if (i)
		                            throw new TypeError("Unknown encoding: " + t);
		                        t = (t + "").toLowerCase(),
		                        i = !0
		                    }
		            }


	                var t = 0 | this.length;
	                return 0 === t ? "" : 0 === arguments.length ? O(this, 0, t) : y.apply(this, arguments)
	            }