function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }