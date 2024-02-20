function storeTypeDocs(query, type, out) {
    if (!out.url) out.url = type.url;
    if (!out.doc) out.doc = parseDoc(query, type.doc);
    if (!out.origin) out.origin = type.origin;
    var ctor,
        boring = infer.cx().protos;

    if (!out.url && !out.doc && type.proto && (ctor = type.proto.hasCtor) && type.proto != boring.Object && type.proto != boring.Function && type.proto != boring.Array) {
      out.url = ctor.url;
      out.doc = parseDoc(query, ctor.doc);
    }
  }