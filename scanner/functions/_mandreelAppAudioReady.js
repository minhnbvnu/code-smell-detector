function _mandreelAppAudioReady()
{
	if ( mandreelAppStartStateFunc )
		mandreelAppStartStateFunc("audioLoaded","");

	if ( mandreelAppUseFlashSockets )
		mandreel_flash_sockets_load_flash(_mandreelAppStartReady);
	else
		_mandreelAppStartReady();
}