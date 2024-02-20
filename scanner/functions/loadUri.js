function loadUri(uri, rootFolder = '.') {
  const path = module.require('path');
  const fs = module.require('fs');

  if (uri.startsWith('http:') || uri.startsWith('https:')) {
    return Promise.reject(new Error('request based loading of URIs not implemented'));
  }

  if (uri.startsWith('data:')) {
    return Promise.resolve(parseDataUri(uri));
  }

  const filePath = path.join((rootFolder = '.'), uri);
  return fs.readFileAsync(filePath).then(buffer => ({buffer}));
}