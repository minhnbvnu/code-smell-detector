function myglBlendEquationSeparate(sp)
 {
	var modeRGB = heap32[sp>>2];sp+=4;
	var modeAlpha = heap32[sp>>2];sp+=4;
	imandreel_gl.blendEquationSeparate(modeRGB,modeAlpha);
 }