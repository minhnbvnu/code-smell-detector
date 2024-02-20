function loadOBJ (url, options = {}) {
  Request.getText(url, (err, obj) => {
    if (err) {
      postMessage('error');
      return;
    }

    let match = obj.match(/^mtllib\s+(.*)$/m);
    if (!match) {
      postMessage('load');
      processOBJ(obj, null, options);
    } else {
      Request.getText(url.replace(/[^\/]+$/, '') + match[1], (err, mtl) => {
        if (err) {
          postMessage('error');
        } else {
          postMessage('load');
          processOBJ(obj, mtl, options);
        }
      });
    }
  });
}