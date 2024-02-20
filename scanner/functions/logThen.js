function logThen(msg, formatIt) {
    return function(it) {
      var args = [new Date(), msg];
      if (formatIt !== null) {
        args.push(formatIt ? formatIt(it) : it);
      }
      console.log.apply(console, args);
      return it;
    };
  }