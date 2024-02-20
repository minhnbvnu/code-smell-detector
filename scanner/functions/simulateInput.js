function simulateInput(elem, value) {
      const inputEvent = new Event('input', {
        bubbles: true,
      });
      setUntrackedInputValue.call(elem, value);
      elem.dispatchEvent(inputEvent);
    }