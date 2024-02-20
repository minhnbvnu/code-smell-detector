function onread (err, buf, read) {
      if (err || !read) return
      parser.execute(buf, 0, read)
      socket.read(buf, onread)
    }