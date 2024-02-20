function insertDataURI() {
	const fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
	fp.init(window, 'Choose File…', Ci.nsIFilePicker.modeOpen);
	fp.open(res => {
    if (res != Ci.nsIFilePicker.returnOK)
      return;

    const contentType = Cc['@mozilla.org/mime;1'].getService(Ci.nsIMIMEService).getTypeFromFile(fp.file);
    const inputStream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
    inputStream.init(fp.file, parseInt('01', 16), parseInt('0600', 8), 0);
    const stream = Cc['@mozilla.org/binaryinputstream;1'].createInstance(Ci.nsIBinaryInputStream);
    stream.setInputStream(inputStream);
    const encoded = btoa(stream.readBytes(stream.available()));
    stream.close();
    inputStream.close();
    insertCodeAtCaret('data:' + contentType + ';base64,' + encoded);
  });
}