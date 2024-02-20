function mandreelAppMouseButton(down,x,y)
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		var i7 = MandreelLockFrame();
		heap32[(i7+0)>>2] = down;
		heap32[(i7+4)>>2] = x;
		heap32[(i7+8)>>2] = y;
		__mouseButton(i7);
		MandreelUnlockFrame();
	}
}