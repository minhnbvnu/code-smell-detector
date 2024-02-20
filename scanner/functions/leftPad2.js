function leftPad2(string) {
    let length4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
    const padLength = Math.max(length4 - string.length, 0);
    return "".concat(" ".repeat(padLength)).concat(string);
  }