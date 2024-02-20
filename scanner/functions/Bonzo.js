function Bonzo(elements) {
      this.length = 0;
      if (elements) {
        elements = typeof elements !== 'string' &&
          !elements.nodeType &&
          typeof elements.length !== 'undefined' ?
            elements :
            [elements];
        this.length = elements.length;
        for (var i = 0; i < elements.length; i++) {
          this[i] = elements[i];
        }
      }
    }