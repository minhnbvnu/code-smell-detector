constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.CIRCLE;

    if (!this.appearance) {
      const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];
      let fillColor = null;
      let interiorColor = parameters.dict.getArray("IC");

      if (interiorColor) {
        interiorColor = getRgbColor(interiorColor);
        fillColor = interiorColor ? Array.from(interiorColor).map(c => c / 255) : null;
      }

      const controlPointsDistance = 4 / 3 * Math.tan(Math.PI / (2 * 4));

      this._setDefaultAppearance({
        xref: parameters.xref,
        extra: `${this.borderStyle.width} w`,
        strokeColor,
        fillColor,
        pointsCallback: (buffer, points) => {
          const x0 = points[0].x + this.borderStyle.width / 2;
          const y0 = points[0].y - this.borderStyle.width / 2;
          const x1 = points[3].x - this.borderStyle.width / 2;
          const y1 = points[3].y + this.borderStyle.width / 2;
          const xMid = x0 + (x1 - x0) / 2;
          const yMid = y0 + (y1 - y0) / 2;
          const xOffset = (x1 - x0) / 2 * controlPointsDistance;
          const yOffset = (y1 - y0) / 2 * controlPointsDistance;
          buffer.push(`${xMid} ${y1} m`);
          buffer.push(`${xMid + xOffset} ${y1} ${x1} ${yMid + yOffset} ${x1} ${yMid} c`);
          buffer.push(`${x1} ${yMid - yOffset} ${xMid + xOffset} ${y0} ${xMid} ${y0} c`);
          buffer.push(`${xMid - xOffset} ${y0} ${x0} ${yMid - yOffset} ${x0} ${yMid} c`);
          buffer.push(`${x0} ${yMid + yOffset} ${xMid - xOffset} ${y1} ${xMid} ${y1} c`);
          buffer.push("h");

          if (fillColor) {
            buffer.push("B");
          } else {
            buffer.push("S");
          }

          return [points[0].x, points[1].x, points[3].y, points[1].y];
        }
      });
    }
  }