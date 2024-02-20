function imandreel_packasynctexture_loaded(buffer,save_file)
{
	if (save_file)
		mandreel_fs_saveFile(_mandreel_currentPackTexture,buffer);

	//mandreelBufferPackAsyncTexture = buffer;
	Mandreel_TextureAsync_PackBufferData[_mandreel_currentPackTexture] = buffer;

	imandreelLoadNextTexturePack();
}