function updateText(file, text, srv) {
    file.text = srv.options.stripCRs ? text.replace(/\r\n/g, "\n") : text;
    file.hasAstral = astral.test(file.text);
    infer.withContext(srv.cx, function () {
      file.ast = parseFile(srv, file);
    });
    file.lineOffsets = null;
  }