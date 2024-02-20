function getTransfers(queue) {
    var transfers = [];
    var fnArray = queue.fnArray, argsArray = queue.argsArray;
    for (var i = 0, ii = queue.length; i < ii; i++) {
      switch (fnArray[i]) {
        case OPS.paintInlineImageXObject:
        case OPS.paintInlineImageXObjectGroup:
        case OPS.paintImageMaskXObject:
          var arg = argsArray[i][0]; // first param in imgData
          if (!arg.cached) {
            transfers.push(arg.data.buffer);
          }
          break;
      }
    }
    return transfers;
  }