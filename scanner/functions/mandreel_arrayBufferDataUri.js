function mandreel_arrayBufferDataUri(offset, size, buffer) {
var bytes = new Uint8Array(buffer,offset,size)
   var ascii = '';
   for (var i=0; i<bytes.length; i++)
     ascii += String.fromCharCode(bytes[i]);
   var base64 = btoa(ascii);

  if (/^\x89PNG/.test(ascii))
    return 'data:image/png;base64,'+base64;
  else
    return 'data:image/jpeg;base64,'+base64;
  }