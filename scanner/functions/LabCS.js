function LabCS(t,o,l){var u;_classCallCheck(this,LabCS);u=r.call(this,"Lab",3);if(!t)throw new c.FormatError("WhitePoint missing - required for color space Lab");o=o||[0,0,0];l=l||[-100,100,-100,100];u.XW=t[0];u.YW=t[1];u.ZW=t[2];u.amin=l[0];u.amax=l[1];u.bmin=l[2];u.bmax=l[3];u.XB=o[0];u.YB=o[1];u.ZB=o[2];if(u.XW<0||u.ZW<0||1!==u.YW)throw new c.FormatError("Invalid WhitePoint components, no fallback available");if(u.XB<0||u.YB<0||u.ZB<0){(0,c.info)("Invalid BlackPoint, falling back to default");u.XB=u.YB=u.ZB=0}if(u.amin>u.amax||u.bmin>u.bmax){(0,c.info)("Invalid Range, falling back to defaults");u.amin=-100;u.amax=100;u.bmin=-100;u.bmax=100}return u}