function callRenderer(ownerId, renderer, req, res) {
  if (renderer && renderer.channel_id) {
    var filter = {
      owner_id: ownerId,
      id : renderer.channel_id
    };

    dao.find('channel', filter, function(err, result) {
      if (err || !result) {
        res.status(404).end();
      } else {
        dao.modelFactory('channel', result).rpc(
          renderer.renderer,
          req.query,
          getClientInfo(req),
          req,
          res
          );
      }
    });
  } else if (renderer && renderer.pod) {
    var channel = dao.modelFactory('channel', {
      owner_id : ownerId,
      action :renderer.pod + '.'
    });

    channel.rpc(
      renderer.renderer,
      req.query,
      getClientInfo(req),
      req,
      res
    );

  } else {
    res.status(404).end();
  }
}