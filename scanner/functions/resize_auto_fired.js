function resize_auto_fired() {
      // Returns true when the browser natively fires the resize
      // event attached to the panes elements
      return browserDetect[0] === 'msie' && parseInt(browserDetect[1]) < 9;
    }