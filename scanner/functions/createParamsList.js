function createParamsList(args) {
    let i = args.length;
    while (i--) {
      if (args[i])
        break;
    }
    return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
  }