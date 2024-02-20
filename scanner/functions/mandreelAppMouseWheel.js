function mandreelAppMouseWheel(delta)
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		var i7 = MandreelLockFrame();
		heap32[(i7+0)>>2] = delta;
		__mouseWheelDelta(i7);
		MandreelUnlockFrame();
	}
}