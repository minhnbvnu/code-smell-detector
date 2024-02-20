function simulateMouseOver(target) {
      const event = new MouseEvent('mouseover', {
        bubbles: true,
      });
      target.dispatchEvent(event);
    }