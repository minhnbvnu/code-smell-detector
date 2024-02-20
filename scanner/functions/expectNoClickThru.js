function expectNoClickThru(element) {
    element.click();
    expect(onClick).toHaveBeenCalledTimes(0);
  }