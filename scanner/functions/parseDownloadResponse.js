function parseDownloadResponse(res) {
  if (!res.ok) {
    return throwAsError(res);
  }
  return new Promise((resolve) => {
    if (isWindowOrWorker()) {
      res.blob().then((data) => resolve(data));
    } else {
      res.buffer().then((data) => resolve(data));
    }
  }).then((data) => {
    const result = JSON.parse(res.headers.get('dropbox-api-result'));

    if (isWindowOrWorker()) {
      result.fileBlob = data;
    } else {
      result.fileBinary = data;
    }

    return new DropboxResponse(res.status, res.headers, result);
  });
}