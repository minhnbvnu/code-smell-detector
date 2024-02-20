function analyzeFile(srv, file) {
    infer.withContext(srv.cx, function () {
      file.scope = srv.cx.topScope;
      srv.signal("beforeLoad", file);
      infer.analyze(file.ast, file.name, file.scope);
      srv.signal("afterLoad", file);
    });
    return file;
  }