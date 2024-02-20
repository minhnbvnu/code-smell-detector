function argsToRanges(args) {
    if (args.length % 4) throw new Error("Wrong number of arguments for ranges.");
    var ranges = [];
    for (var i = 0; i < args.length; i += 4)
      ranges.push({anchor: Pos(args[i], args[i + 1]),
                   head: Pos(args[i + 2], args[i + 3])});
    return ranges;
  }