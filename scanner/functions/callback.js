function callback() {
        if (!hasParams) {
          fn(iteration);
        } else {
          fn.apply(null, args);
        }
      }