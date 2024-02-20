function mandreelAppKeyEvent(down,keyId)
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		var i7 = MandreelLockFrame();
		heap32[(i7+0)>>2] = down;
		heap32[(i7+4)>>2] = keyId;
		__keyEvent(i7);
		MandreelUnlockFrame();
	}
}