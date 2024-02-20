function determineContentType (filePath) {
  switch (path.extname(filePath)) {
    case '.html': return 'text/html'
    case '.css': return 'text/css'
    case '.js': return 'application/javascript'
    case '.png': return 'image/png'
    case '.jpg': case '.jpeg': return 'image/jpeg'
    default: return 'application/octet-stream'
  }
}