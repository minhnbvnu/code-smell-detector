function mandreel_fs_saveFile(name, my_arrayBuffer)
{
	if (mandreel_indexedDB.db)
	{
		mandreel_indexedDB.save(name,my_arrayBuffer);
		return;
	}

	if (!g_mandreel_fs)
		return;

	Mandreel_window.localStorage.removeItem(mandreel_fs_get_key(name));
	g_mandreel_fs.root.getFile(name, {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
		Mandreel_window.localStorage.setItem(mandreel_fs_get_key(name),'valid');
        dump('Write completed.');
      };

      fileWriter.onerror = function(e) {
        dump('Write failed: ' + e.toString());
      };

	  var my_BlobBuilder = Mandreel_window.MozBlobBuilder || Mandreel_window.WebKitBlobBuilder || Mandreel_window.BlobBuilder;

	  var bb = new my_BlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
      bb.append(my_arrayBuffer);
      fileWriter.write(bb.getBlob('text/plain'));



    }, MandreelFsErrorHandler);

  }, MandreelFsErrorHandler);
}