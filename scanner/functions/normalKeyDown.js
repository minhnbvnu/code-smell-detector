function normalKeyDown(){
      var tempKeyCode;
      p.keyPressed();
      tempKeyCode = p.keyCode;
      p.keyCode = 0;
      p.keyTyped();
      p.keyCode = tempKeyCode;
    }