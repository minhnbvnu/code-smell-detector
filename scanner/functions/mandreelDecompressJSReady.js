function mandreelDecompressJSReady(code, save_file)
{
	if (save_file)
		mandreel_fs_saveFile(mandreelAppMandreelJs + ".lzma", code);

	var ga = Mandreel_document.createElement('script');
	ga.type = "text/javascript";
	ga.text = code;
	var s = Mandreel_document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	s.parentNode.removeChild(ga);
	mandreelJsScriptLoaded();
}