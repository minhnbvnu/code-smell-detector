function requestWithNOTHING(next) {
    request(
      'nothing',
      {
        port: 1337,
        path: '/',
        agent: false
      },
      next
    )
  }