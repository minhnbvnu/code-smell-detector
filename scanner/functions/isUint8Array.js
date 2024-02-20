function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }