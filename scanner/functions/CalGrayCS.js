function CalGrayCS(t,o,l){var u;_classCallCheck(this,CalGrayCS);u=r.call(this,"CalGray",1);if(!t)throw new c.FormatError("WhitePoint missing - required for color space CalGray");o=o||[0,0,0];l=l||1;u.XW=t[0];u.YW=t[1];u.ZW=t[2];u.XB=o[0];u.YB=o[1];u.ZB=o[2];u.G=l;if(u.XW<0||u.ZW<0||1!==u.YW)throw new c.FormatError("Invalid WhitePoint components for ".concat(u.name)+", no fallback available");if(u.XB<0||u.YB<0||u.ZB<0){(0,c.info)("Invalid BlackPoint for ".concat(u.name,", falling back to default."));u.XB=u.YB=u.ZB=0}0===u.XB&&0===u.YB&&0===u.ZB||(0,c.warn)("".concat(u.name,", BlackPoint: XB: ").concat(u.XB,", YB: ").concat(u.YB,", ")+"ZB: ".concat(u.ZB,", only default values are supported."));if(u.G<1){(0,c.info)("Invalid Gamma: ".concat(u.G," for ").concat(u.name,", ")+"falling back to default.");u.G=1}return u}