function mandreel_webaudio_saveFile(name, my_arrayBuffer)
{
	dump('mandreel_webaudio_saveFile ' + name);
	g_mandreel_fs.root.getFile(name, {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        dump('Write completed.');
      };

      fileWriter.onerror = function(e) {
        dump('Write failed: ' + e.toString());
      };

	  var bb = new Mandreel_window.BlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
      bb.append(my_arrayBuffer);
      fileWriter.write(bb.getBlob('text/plain'));



    }, function(e) { dump('error 1 mandreel_webaudio_saveFile ' + name);MandreelFsErrorHandler(e) });

  }, function(e) { dump('error 2 mandreel_webaudio_saveFile ' + name);MandreelFsErrorHandler(e) });
}