function onWheel(e) {
      var moved = CodeMirror.wheelEventPixels(e)[self.orientation == "horizontal" ? "x" : "y"];
      var oldPos = self.pos;
      self.moveTo(self.pos + moved);
      if (self.pos != oldPos) CodeMirror.e_preventDefault(e);
    }