function pushDir(dirName, def, interpTokens) {
      var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
      var parsed = !hasOneTimeToken && parseDirective(value);
      dirs.push({
        name: dirName,
        attr: rawName,
        raw: rawValue,
        def: def,
        arg: arg,
        modifiers: modifiers,
        // conversion from interpolation strings with one-time token
        // to expression is differed until directive bind time so that we
        // have access to the actual vm context for one-time bindings.
        expression: parsed && parsed.expression,
        filters: parsed && parsed.filters,
        interp: interpTokens,
        hasOneTime: hasOneTimeToken
      });
    }