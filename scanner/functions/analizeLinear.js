function analizeLinear(bg, width, height) {
    const direction = bg.match(/([-]?\d{1,3})deg/);
    const dir = direction && direction[1] ? parseFloat(direction[1]) : 0;
    let coordinate;
    switch (dir) {
      case 0: coordinate = [0, -height / 2, 0, height / 2]; break;
      case 90: coordinate = [width / 2, 0, -width / 2, 0]; break;
      case -90: coordinate = [-width / 2, 0, width / 2, 0]; break;
      case 180: coordinate = [0, height / 2, 0, -height / 2]; break;
      case -180: coordinate = [0, -height / 2, 0, height / 2]; break;
      default:
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        if (direction[1] > 0 && direction[1] < 90) {
          x1 = (width / 2) - ((width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else if (direction[1] > -180 && direction[1] < -90) {
          x1 = -(width / 2) + ((width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else if (direction[1] > 90 && direction[1] < 180) {
          x1 = (width / 2) + (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else {
          x1 = -(width / 2) - (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        }
        coordinate = [x1, y1, x2, y2];
      break;
    }
    return coordinate;
  }