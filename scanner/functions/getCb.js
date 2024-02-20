function getCb(resp) {
      resp.toString('ascii').should.equal('Hello world!');
      cb();
    }