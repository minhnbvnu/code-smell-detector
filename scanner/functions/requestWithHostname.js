function requestWithHostname(next) {
    request(
      'options.hostname',
      {
        hostname: 'localhost',
        port: 1337,
        path: '/',
        agent: false
      },
      next
    )
  }