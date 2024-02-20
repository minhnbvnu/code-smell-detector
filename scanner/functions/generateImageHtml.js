function generateImageHtml(imgFile, imgId, imgClass, imgStyle, ab, settings) {
  var imgDir = settings.image_source_path,
      imgAlt = encodeHtmlEntities(settings.image_alt_text || ''),
      html, src;

  src = imgDir ? pathJoin(imgDir, imgFile) : imgFile;
  if (settings.cache_bust_token) {
    src += '?v=' + settings.cache_bust_token;
  }
  html = '\t\t<img id="' + imgId + '" class="' + imgClass + '" alt="' + imgAlt + '"';
  if (imgStyle) {
    html += ' style="' + imgStyle + '"';
  }
  if (isTrue(settings.use_lazy_loader)) {
    html += ' data-src="' + src + '"';
    // placeholder while image loads
    // (<img> element requires a src attribute, according to spec.)
    src = 'data:image/gif;base64,R0lGODlhCgAKAIAAAB8fHwAAACH5BAEAAAAALAAAAAAKAAoAAAIIhI+py+0PYysAOw==';
  }
  html += ' src="' + src + '"/>\r';
  return html;
}