function CalRGBCS(t,o,l,u){var h;_classCallCheck(this,CalRGBCS);h=r.call(this,"CalRGB",3);if(!t)throw new c.FormatError("WhitePoint missing - required for color space CalRGB");o=o||new Float32Array(3);l=l||new Float32Array([1,1,1]);u=u||new Float32Array([1,0,0,0,1,0,0,0,1]);var d=t[0],g=t[1],y=t[2];h.whitePoint=t;var m=o[0],v=o[1],w=o[2];h.blackPoint=o;h.GR=l[0];h.GG=l[1];h.GB=l[2];h.MXA=u[0];h.MYA=u[1];h.MZA=u[2];h.MXB=u[3];h.MYB=u[4];h.MZB=u[5];h.MXC=u[6];h.MYC=u[7];h.MZC=u[8];if(d<0||y<0||1!==g)throw new c.FormatError("Invalid WhitePoint components for ".concat(h.name)+", no fallback available");if(m<0||v<0||w<0){(0,c.info)("Invalid BlackPoint for ".concat(h.name," [").concat(m,", ").concat(v,", ").concat(w,"], ")+"falling back to default.");h.blackPoint=new Float32Array(3)}if(h.GR<0||h.GG<0||h.GB<0){(0,c.info)("Invalid Gamma [".concat(h.GR,", ").concat(h.GG,", ").concat(h.GB,"] for ")+"".concat(h.name,", falling back to default."));h.GR=h.GG=h.GB=1}return h}