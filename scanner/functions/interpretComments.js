function interpretComments(node, comments, scope, aval, type) {
    jsdocInterpretComments(node, scope, aval, comments);
    var cx = infer.cx();

    if (!type && aval instanceof infer.AVal && aval.types.length) {
      type = aval.types[aval.types.length - 1];
      if (!(type instanceof infer.Obj) || type.origin != cx.curOrigin || type.doc)
        type = null;
    }

    for (var i = comments.length - 1; i >= 0; i--) {
      var text = stripLeadingChars(comments[i].split(/\r\n?|\n/)).join("\n");
      if (text) {
        if (aval instanceof infer.AVal) aval.doc = text;
        if (type) type.doc = text;
        break;
      }
    }
  }