function expectClickThru(element) {
    element.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  }