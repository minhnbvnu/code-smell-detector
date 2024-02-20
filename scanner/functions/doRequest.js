function doRequest(srv, doc, c) {
    if (doc.query && !queryTypes.hasOwnProperty(doc.query.type)) return c("No query type '" + doc.query.type + "' defined");
    var query = doc.query; // Respond as soon as possible when this just uploads files

    if (!query) c(null, {});
    var files = doc.files || [];
    if (files.length) ++srv.uses;

    for (var i = 0; i < files.length; ++i) {
      var file = files[i];
      file.name = srv.normalizeFilename(file.name);
      if (file.type == "delete") srv.delFile(file.name);else ensureFile(srv, file.name, null, file.type == "full" ? file.text : null);
    }

    var timeBudget = typeof doc.timeout == "number" ? [doc.timeout] : null;

    if (!query) {
      analyzeAll(srv, timeBudget, function () {});
      return;
    }

    var queryType = queryTypes[query.type];

    if (queryType.takesFile) {
      if (typeof query.file != "string") return c(".query.file must be a string");
      if (!/^#/.test(query.file)) ensureFile(srv, query.file, null);
    }

    analyzeAll(srv, timeBudget, function (err) {
      if (err) return c(err);
      var file = queryType.takesFile && resolveFile(srv, files, query.file);
      if (queryType.fullFile && file.type == "part") return c("Can't run a " + query.type + " query on a file fragment");
      infer.resetGuessing();
      infer.withContext(srv.cx, function () {
        var result,
            run = function () {
          result = queryType.run(srv, query, file);
        };

        try {
          if (timeBudget) infer.withTimeout(timeBudget[0], run);else run();
        } catch (e) {
          if (srv.options.debug && e.name != "TernError") console.error(e.stack);
          return c(e);
        }

        c(null, result);
      });
    });
  }