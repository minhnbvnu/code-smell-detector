function spyThrough(method) {
    return jasmine.createSpy().andCallFake(fake);

    function fake() {
      return localStorage[method].apply(localStorage, arguments);
    }
  }