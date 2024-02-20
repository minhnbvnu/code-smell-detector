async function registerProtocol() {
  console.log('registerprotocol');
  protocol.unregisterProtocol('chrome-extension');
  var cache = {};
  protocol.registerBufferProtocol('chrome-extension', function(request, callback) {
    if (request.url == `chrome-extension://${chrome.runtime.id}/_generated_background_page.html`) {
      var scripts = global.chromeManifest.app.background.scripts;
      var scriptsString = scripts
      .map(s => `<script src="${s}" type="text/javascript"></script>`)
      .join('\n');
      var html = `<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n${scriptsString}\n</body>\n</html>\n`
      callback(Buffer.from(html));
      return;
    }

    if (cache[request.url]) {
      callback(cache[request.url]);
      return;
    }

    var file = request.url.replace(`chrome-extension://${chrome.runtime.id}/`, '');
    file = path.join(global.chromeAppDir, file);
    var query = file.indexOf('?');
    if (query != -1)
      file = file.substring(0, query);
    fs.readFile(file, function(e, d) {
      var result = cache[request.url] = e || d;
      if (request.url.indexOf('.html') != -1)
        callback({
          data: result,
          mimeType: 'text/html',
        })
      else
        callback(result);
    })
  })
}