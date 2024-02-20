function mandreel_flashaudiolite_createBuffer(fileName)
{
	mandreel_audio_flash_lastBufferCreated++;
	mandreel_sendmsg_flash("createBuffer "+wa_getFileNameNoExt(fileName)+" "+mandreel_audio_flash_lastBufferCreated);
}