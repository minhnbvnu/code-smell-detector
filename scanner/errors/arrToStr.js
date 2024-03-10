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