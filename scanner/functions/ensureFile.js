function ensureFile(srv, name, parent, text) {
    var known = srv.findFile(name);

    if (known) {
      if (text != null) {
        if (known.scope) {
          srv.needsPurge.push(name);
          infer.clearScopes(known.ast);
          known.scope = null;
        }

        updateText(known, text, srv);
      }

      if (parentDepth(srv, known.parent) > parentDepth(srv, parent)) {
        known.parent = parent;
        if (known.excluded) known.excluded = null;
      }

      return;
    }

    var file = new File(name, parent);
    srv.files.push(file);
    srv.fileMap[name] = file;

    if (text != null) {
      updateText(file, text, srv);
    } else if (srv.options.async) {
      srv.startAsyncAction();
      srv.options.getFile(name, function (err, text) {
        updateText(file, text || "", srv);
        srv.finishAsyncAction(err);
      });
    } else {
      updateText(file, srv.options.getFile(name) || "", srv);
    }
  }