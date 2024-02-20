function mandreelAppMouseDblClick(x,y)
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		var i7 = MandreelLockFrame();
		heap32[(i7+0)>>2] = x;
		heap32[(i7+4)>>2] = y;
		__mouseDoubleClick(i7);
		MandreelUnlockFrame();
	}
}