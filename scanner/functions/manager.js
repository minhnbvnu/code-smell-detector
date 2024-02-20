function manager(request, response) {
            response.writeHead(200);
            response.end(JSON.stringify({ cwd: config.cwd, pid: process.pid }));
          }