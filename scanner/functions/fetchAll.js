function fetchAll(srv, c) {
    var done = true,
        returned = false;
    srv.files.forEach(function (file) {
      if (file.text != null) return;

      if (srv.options.async) {
        done = false;
        srv.options.getFile(file.name, function (err, text) {
          if (err && !returned) {
            returned = true;
            return c(err);
          }

          updateText(file, text || "", srv);
          fetchAll(srv, c);
        });
      } else {
        try {
          updateText(file, srv.options.getFile(file.name) || "", srv);
        } catch (e) {
          return c(e);
        }
      }
    });
    if (done) c();
  }