function deployInstance(_, _req, _res) {
    t.equal(_req, req);
    t.equal(_res, res);
    t.end();
  }