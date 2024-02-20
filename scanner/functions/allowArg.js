function allowArg() {
      if (key in args) {
        acc[key] = args[key];
      }

      return acc;
    }