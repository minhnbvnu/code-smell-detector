function continueQuasiType(type) {
      if (type == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasiType);
      }
    }