function myglBlendFuncSeparate(sp)
 {
	var srcRGB = heap32[sp>>2];sp+=4;
	var dstRGB = heap32[sp>>2];sp+=4;
	var srcAlpha = heap32[sp>>2];sp+=4;
	var dstAlpha = heap32[sp>>2];sp+=4;

	imandreel_gl.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
 }