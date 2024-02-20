function _Class() {
      this.handleWindowMouseUp = __bind(this.handleWindowMouseUp, this);
      this.handleWindowMouseMove = __bind(this.handleWindowMouseMove, this);
      this.dragging = null;
      this.mousePosition = {
        x: 0,
        y: 0
      };
      this.autofocus = null;
      this.selectedFn = _.last(appRoot.fns);
      this.selectedChildFns = [];
      this.hoveredChildFn = null;
      this.expandedChildFns = {};
      this.showSymbolic = true;
      this.registerEvents();
    }