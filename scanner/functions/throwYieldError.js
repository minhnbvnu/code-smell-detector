function throwYieldError(proxy, text, args) {
      var msg = sinon.functionName(proxy) + text;
      if (args.length) {
        msg += " Received [" + slice.call(args).join(", ") + "]";
      }
      throw new Error(msg);
    }