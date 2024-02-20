function makeVideoHtml(url, settings) {
  url = trim(url);
  if (!/^https:/.test(url) || !/\.mp4$/.test(url)) {
    return '';
  }
  var srcName = isTrue(settings.use_lazy_loader) ? 'data-src' : 'src';
  return '<video ' + srcName + '="' + url + '" autoplay muted loop playsinline style="top:0; width:100%; object-fit:contain; position:absolute"></video>';
}