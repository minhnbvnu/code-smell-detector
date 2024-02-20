function scheduleRedraw(delay) {
      clearTimeout(self.doRedraw);
      self.doRedraw = setTimeout(function() { self.redraw(); }, delay);
    }