function DOMMap() {
      counter++;  // make id clashing highly improbable
      this.__ce__ = new Event(('@DOMMap:' + counter) + Math.random());
    }