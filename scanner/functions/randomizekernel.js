function randomizekernel() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        kernel[i][j] = random(-1, 1);
      }
    }
  }