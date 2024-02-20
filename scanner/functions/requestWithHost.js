function requestWithHost(next) {
    request(
      'options.host',
      {
        host: 'localhost',
        port: 1337,
        path: '/',
        agent: false
      },
      next
    )
  }