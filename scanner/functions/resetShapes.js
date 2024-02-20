function resetShapes() {
        for (var attr in shapes) {
          shapes[attr].x = 0;
          shapes[attr].y = -1;
        }
      }