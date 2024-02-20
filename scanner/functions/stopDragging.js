function stopDragging() {
      var self = this;
      var a = elements[self.a].element;
      var b = elements[self.b].element;

      if (self.dragging && options.onDragEnd) {
        options.onDragEnd();
      }

      self.dragging = false;

      // Remove the stored event listeners. This is why we store them.
      global[removeEventListener]('mouseup', self.stop);
      global[removeEventListener]('touchend', self.stop);
      global[removeEventListener]('touchcancel', self.stop);

      self.parent[removeEventListener]('mousemove', self.move);
      self.parent[removeEventListener]('touchmove', self.move);

      // Delete them once they are removed. I think this makes a difference
      // in memory usage with a lot of splits on one page. But I don't know for sure.
      delete self.stop;
      delete self.move;

      a[removeEventListener]('selectstart', NOOP);
      a[removeEventListener]('dragstart', NOOP);
      b[removeEventListener]('selectstart', NOOP);
      b[removeEventListener]('dragstart', NOOP);

      a.style.userSelect = '';
      a.style.webkitUserSelect = '';
      a.style.MozUserSelect = '';
      a.style.pointerEvents = '';

      b.style.userSelect = '';
      b.style.webkitUserSelect = '';
      b.style.MozUserSelect = '';
      b.style.pointerEvents = '';

      self.gutter.style.cursor = '';
      self.parent.style.cursor = '';
    }