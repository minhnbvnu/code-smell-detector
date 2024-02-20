function _checkBlockLabels() {
      for (var t in _current) {
        var label = _current[t],
            labelType = label["(type)"];
        if (labelType === "unused" || (labelType === "const" && label["(unused)"])) {
          if (state.option.unused) {
            var tkn = _current[t]["(token)"];
            if (tkn.exported) {
              continue;
            }

            warnUnused(t, tkn, "var");
          }
        }
      }
    }