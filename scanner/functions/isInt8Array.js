function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }