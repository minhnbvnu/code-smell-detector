function matchingFake(fakes, args, strict) {
      if (!fakes) {
        return;
      }

      var alen = args.length;

      for (var i = 0, l = fakes.length; i < l; i++) {
        if (fakes[i].matches(args, strict)) {
          return fakes[i];
        }
      }
    }