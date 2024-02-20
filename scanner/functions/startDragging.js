function startDragging(e) {
      // Alias frequently used variables to save space. 200 bytes.
      var self = this;
      var a = elements[self.a].element;
      var b = elements[self.b].element;

      // Call the onDragStart callback.
      if (!self.dragging && options.onDragStart) {
        options.onDragStart();
      }

      // Don't actually drag the element. We emulate that in the drag function.
      e.preventDefault();

      // Set the dragging property of the pair object.
      self.dragging = true;

      // Create two event listeners bound to the same pair object and store
      // them in the pair object.
      self.move = drag.bind(self);
      self.stop = stopDragging.bind(self);

      // All the binding. `window` gets the stop events in case we drag out of the elements.
      global[addEventListener]('mouseup', self.stop);
      global[addEventListener]('touchend', self.stop);
      global[addEventListener]('touchcancel', self.stop);

      self.parent[addEventListener]('mousemove', self.move);
      self.parent[addEventListener]('touchmove', self.move);

      // Disable selection. Disable!
      a[addEventListener]('selectstart', NOOP);
      a[addEventListener]('dragstart', NOOP);
      b[addEventListener]('selectstart', NOOP);
      b[addEventListener]('dragstart', NOOP);

      a.style.userSelect = 'none';
      a.style.webkitUserSelect = 'none';
      a.style.MozUserSelect = 'none';
      a.style.pointerEvents = 'none';

      b.style.userSelect = 'none';
      b.style.webkitUserSelect = 'none';
      b.style.MozUserSelect = 'none';
      b.style.pointerEvents = 'none';

      // Set the cursor, both on the gutter and the parent element.
      // Doing only a, b and gutter causes flickering.
      self.gutter.style.cursor = cursor;
      self.parent.style.cursor = cursor;

      // Cache the initial sizes of the pair.
      calculateSizes.call(self);
    }