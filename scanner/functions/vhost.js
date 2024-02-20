function vhost(req) {
    req.raw_path = req.raw_path || '/';
    return PouchDB.virtualHost(req, vhosts);
  }