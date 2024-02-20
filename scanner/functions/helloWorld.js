function helloWorld() {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' })
    this.res.end('eric says hello')
  }