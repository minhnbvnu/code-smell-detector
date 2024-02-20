function fn0() {
    this.res.writeHead(200, { 'Content-Type': 'application/json' })
    this.res.end('{"status":"ok"}')
  }