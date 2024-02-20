function updateMousePosition(curElement, event) {
      var offset = calculateOffset(curElement, event);
      p.mouseX = event.pageX - offset.X;
      p.mouseY = event.pageY - offset.Y
    }