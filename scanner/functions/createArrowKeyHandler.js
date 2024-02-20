function createArrowKeyHandler(bigStep, smallStep) {
  return function arrowKeyHandler(event) {
    event.preventDefault();

    const step = event.shiftKey ? bigStep : smallStep;
    try {
      const bigValue = new Big(event.target.value);
      this.updateValue(bigValue.plus(step).toString(), true);
    } catch (e) {
      // event.target.value is not a number — do nothing
    }
  };
}