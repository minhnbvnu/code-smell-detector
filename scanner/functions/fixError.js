function fixError(r, code) {
      return errors[r.code](r, code);
    }