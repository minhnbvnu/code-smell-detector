function addError(type, code, msg, row) {
      _results.errors.push({
        type,
        code,
        message: msg,
        row
      });
    }