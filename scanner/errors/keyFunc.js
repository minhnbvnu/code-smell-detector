function keyFunc(e, type) {
      var tempKeyCode;
      p.key = keyCodeMap(e.keyCode, e.shiftKey);
      if (type === "keypress") {
        if (e.keyCode === e.charCode) {  // Hack for Google Chrome that bypasses problem with keys being the same keyCode
          p.keyCode = -1;               // for keydown and keypress - like s and F4 give the same keyCode of 115
        }
      }
      switch (p.keyCode) {
        case 19:  // Pause-Break
        case 33:  // Page Up
        case 34:  // Page Down
        case 35:  // End
        case 36:  // Home
        case 37:  // Left Arrow
        case 38:  // Up Arrow
        case 39:  // Right Arrow
        case 40:  // Down Arrow
        case 45:  // Insert
        case 112: // F1
        case 113: // F2
        case 114: // F3
        case 115: // F4
        case 116: // F5
        case 117: // F6
        case 118: // F7
        case 119: // F8
        case 120: // F9
        case 121: // F10
        case 122: // F11
        case 123: // F12
        case 145: // Scroll Lock
        case 155: // Insert
        case 224: // NumPad Up
        case 225: // NumPad Down
        case 226: // NumPad Left
        case 227: // NumPad Right
          if (type === "keydown") {
            if (gRefire) {
              p.keyReleased();
              p.keyPressed();
            } else {
              p.keyPressed();
              gRefire = true;
            }
          } else if (type === "keypress") {
            if (firstCodedDown) {
              firstCodedDown = false;
            } else {
              p.keyReleased();
              p.keyPressed();
            }
          } else if (type === "keyup") {
            p.keyReleased();
            if (firstCodedDown === false) { firstCodedDown = true; }
            if (gRefire){ gRefire = false; }
          }
          break;
        case 16:  // Shift
        case 17:  // Ctrl
        case 18:  // Alt
        case 20:  // Caps Lock
        case 144: // Num Lock
          if (type === "keydown") {
            p.keyPressed();
          } else if (type === "keyup") {
            p.keyReleased();
          }
          break;
        case 46:  // Delete
        case 13: // Enter
          if (type === "keydown") {
            if (firstEDGKeyDown === true) {
              firstEDGKeyDown = false;
              normalKeyDown();
            } else {
              refireKeyDown();
            }
          } else if (type === "keypress") {
            if (firstEDMKeyDown === true) {
              firstEDMKeyDown = false;
            } else {
              refireKeyDown();
            }
          } else if (type === "keyup") {
            p.keyCode = e.keyCode;
            p.keyReleased();
            if (firstEDGKeyDown === false) { firstEDGKeyDown = true; }
            if (firstEDMKeyDown === false) { firstEDMKeyDown = true; }
          }
          break;
        default:
          if (p.keyCode === -1) {
            p.keyCode = e.keyCode;
          }
          if (e.keyCode === 0) {
            p.key = charCodeMap(e.charCode, e.shiftKey);  // dealing with Mozilla key strokes
            if (type === "keypress") {
              if (firstMKeyDown === true) {
                firstMKeyDown = false;
              } else {
                refireKeyDown();
              }
            } else if (type === "keyup") {
              p.keyCode = e.keyCode;
              p.keyReleased();
              if (firstMKeyDown === false) { firstMKeyDown = true; }
            }
          } else {
            p.key = charCodeMap(e.keyCode, e.shiftKey);  // dealing with Google key strokes
            if (type === "keydown") {
              if (firstGKeyDown === true) {
                firstGKeyDown = false;
                normalKeyDown();
              } else {
                refireKeyDown();
              }
            } else if (type === "keyup") {
              p.keyCode = e.keyCode;
              p.keyReleased();
              if (firstMKeyDown === false) { firstMKeyDown = true; }
              if (firstGKeyDown === false) { firstGKeyDown = true; }
            }
          }
          break;
      }
    }