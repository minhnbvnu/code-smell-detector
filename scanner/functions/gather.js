function gather(prop, obj, depth, addInfo) {
      // 'hasOwnProperty' and such are usually just noise, leave them
      // out when no prefix is provided.
      if ((objLit || query.omitObjectPrototype !== false) && obj == srv.cx.protos.Object && !word) return;
      if (query.filter !== false && word && (query.caseInsensitive ? prop.toLowerCase() : prop).indexOf(word) !== 0) return;
      if (ignoreObj && ignoreObj.props[prop]) return;
      var result = addCompletion(query, completions, prop, obj && obj.props[prop], depth);
      if (addInfo && result && typeof result != "string") addInfo(result);
    }