function withoutConversion(fn) {
    shouldConvert = false;
    fn();
    shouldConvert = true;
  }