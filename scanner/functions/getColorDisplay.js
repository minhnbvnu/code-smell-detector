function getColorDisplay(c,s)
{
	if ( c.indexOf("#") != 0 ){
		var arr = c.replace(/[a-z()\s]/g,"").split(",");
		var rgb = {r:arr[0],g:arr[1],b:arr[2]};
	}
	s = s || ( $("#hex").is(":checked") ? "hex" : ($("#rgb").is(":checked") ? "rgb":"cmyk") );
	if ( s=="hex" ){
		if ( rgb ) return rgbToHex(rgb.r,rgb.g,rgb.b);
		return c;
	}
	if ( s=="rgb" ){
		if (!rgb) rgb = hexToRgb(c);
		return rgb.r + "," + rgb.g + "," + rgb.b;
	}
	if ( s=="cmyk" ){
		if (!rgb) rgb = hexToRgb(c);
		var cmyk = rgb2cmyk(rgb.r,rgb.g,rgb.b);
		return cmyk[0] + "," + cmyk[1] + "," + cmyk[2] + "," + cmyk[3];
	}
}