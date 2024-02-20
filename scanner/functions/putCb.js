function putCb(err, resp) {
      resp.ok.should.be.ok;
      db.getAttachment('test', 'test').then(getCb);
    }