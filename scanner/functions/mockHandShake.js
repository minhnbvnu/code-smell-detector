function mockHandShake(config = {}) {
    const redirect = nock(URL)
      .post(helper.generateCollectorPath('preconnect'))
      .reply(200, {
        return_value: {
          redirect_host: 'collector.newrelic.com',
          security_policies: {}
        }
      })

    const handshake = nock(URL)
      .post(helper.generateCollectorPath('connect'))
      .reply(200, { return_value: config })
    return { redirect, handshake }
  }