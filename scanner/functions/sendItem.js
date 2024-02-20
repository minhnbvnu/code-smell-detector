function sendItem(res, item) {
  // Send the response
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Last-Modified": item.mtime.toUTCString()
  });
  res.end(JSON.stringify(item.value));
}