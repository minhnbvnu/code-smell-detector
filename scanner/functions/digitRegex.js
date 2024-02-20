function digitRegex(_ref, append) {
    var numberingSystem = _ref.numberingSystem;

    if (append === void 0) {
      append = "";
    }

    return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append);
  }