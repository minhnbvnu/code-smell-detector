function TrackAlignable(cm) {
    this.cm = cm
    this.alignable = []
    this.height = cm.doc.height
    var self = this
    cm.on("markerAdded", function(_, marker) {
      if (!marker.collapsed) return
      var found = marker.find(1)
      if (found != null) self.set(found.line, F_MARKER)
    })
    cm.on("markerCleared", function(_, marker, _min, max) {
      if (max != null && marker.collapsed)
        self.check(max, F_MARKER, self.hasMarker)
    })
    cm.on("markerChanged", this.signal.bind(this))
    cm.on("lineWidgetAdded", function(_, widget, lineNo) {
      if (widget.mergeSpacer) return
      if (widget.above) self.set(lineNo - 1, F_WIDGET_BELOW)
      else self.set(lineNo, F_WIDGET)
    })
    cm.on("lineWidgetCleared", function(_, widget, lineNo) {
      if (widget.mergeSpacer) return
      if (widget.above) self.check(lineNo - 1, F_WIDGET_BELOW, self.hasWidgetBelow)
      else self.check(lineNo, F_WIDGET, self.hasWidget)
    })
    cm.on("lineWidgetChanged", this.signal.bind(this))
    cm.on("change", function(_, change) {
      var start = change.from.line, nBefore = change.to.line - change.from.line
      var nAfter = change.text.length - 1, end = start + nAfter
      if (nBefore || nAfter) self.map(start, nBefore, nAfter)
      self.check(end, F_MARKER, self.hasMarker)
      if (nBefore || nAfter) self.check(change.from.line, F_MARKER, self.hasMarker)
    })
    cm.on("viewportChange", function() {
      if (self.cm.doc.height != self.height) self.signal()
    })
  }