function checkParams(segment, host, port) {
      const attributes = segment.getAttributes()
      t.equal(attributes.host, host, 'should have correct host (' + host + ')')
      t.equal(attributes.port_path_or_id, port, 'should have correct port (' + port + ')')
    }