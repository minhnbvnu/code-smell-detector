function mandreel_webaudio_loadFile(name, callback, callback2)
{
	g_mandreel_fs.root.getFile(name, {}, function(fileEntry) {

	fileEntry.file(function(file) {

		var reader = new FileReader();


       reader.onloadend = function(e) {

	   dump('mandreel_fs_loadFile ' + name);
	   if (this.result.byteLength)
		callback(this.result);
	   else
	   callback2(this.result);

       };


	   	reader.readAsArrayBuffer(file);



	}, function(e) { dump('error 1 webaudio_loadFile ' + name);MandreelFsErrorHandler(e) } );

  }, function(e) { dump('error 2 webaudio_loadFile ' + name);MandreelFsErrorHandler(e) } );
}