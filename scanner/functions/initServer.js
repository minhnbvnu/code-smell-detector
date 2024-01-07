function initServer() {
  const host = 'localhost';
  const port = 8000;

  const requestListener = function (request, response) {
    let contents;
    switch (request.url) {
      case '/react.js':
      case '/react-dom.js':
      case '/scheduler.js':
        response.setHeader('Content-Type', 'text/javascript');
        response.writeHead(200);
        contents = readFileSync(
          join(__dirname, DEPENDENCIES_DIRECTORY, request.url)
        );
        response.end(contents);
        break;
      case '/app.js':
        response.setHeader('Content-Type', 'text/javascript');
        response.writeHead(200);
        contents = readFileSync(join(__dirname, 'app.js'));
        response.end(contents);
        break;
      case '/index.html':
      default:
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        contents = readFileSync(join(__dirname, 'index.html'));
        response.end(contents);
        break;
    }
  };

  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}