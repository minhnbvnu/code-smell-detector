function AC_AddExtension(src, ext)
{
  var qIndex = src.indexOf('?');
  if ( qIndex != -1)
  {
    // Add the extention (if needed) before the query params
    var path = src.substring(0, qIndex);
    if (path.length >= ext.length && path.lastIndexOf(ext) == (path.length - ext.length))
      return src;
    else
      return src.replace(/\?/, ext+'?'); 
  }
  else
  {
    // Add the extension (if needed) to the end of the URL
    if (src.length >= ext.length && src.lastIndexOf(ext) == (src.length - ext.length))
      return src;  // Already have extension
    else
      return src + ext;
  }
}