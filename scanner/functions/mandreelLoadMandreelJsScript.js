function mandreelLoadMandreelJsScript()
{
	if (mandreelAppMandreelJsCompressed)
	{
		mandreel_fs_load_text(mandreelAppMandreelJs + ".lzma", mandreel_load_compressed_js);

	}
	else
	{
		var ga = Mandreel_document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.onload = ga.onreadystatechange = mandreelJsScriptLoaded;
		var url = mandreelAppMandreelJs;
		if ( mandreelAppReadMandreelJsFromLocalHost )
			ga.src = mandreelAppLocalHost+"/"+url;
		else
			ga.src = url;
		var s = Mandreel_document.getElementsByTagName('script')[0];
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingScript","");
		s.parentNode.insertBefore(ga, s);
	}
}