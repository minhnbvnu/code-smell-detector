function makeFakeRequest(opts) {
        t.ok(opts.headers, 'should assign headers when null')
        t.ok(opts.headers.traceparent, 'traceparent should exist')
        req.path = path
        return req
      }