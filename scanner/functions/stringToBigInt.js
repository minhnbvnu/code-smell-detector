function stringToBigInt(str) {
    if (typeof BigInt !== "function") {
      return null;
    }
    return BigInt(str.replace(/_/g, ""));
  }