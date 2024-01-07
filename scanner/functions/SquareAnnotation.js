constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.SQUARE;

    if (!this.appearance) {
      const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];
      let fillColor = null;
      let interiorColor = parameters.dict.getArray("IC");

      if (interiorColor) {
        interiorColor = getRgbColor(interiorColor);
        fillColor = interiorColor ? Array.from(interiorColor).map(c => c / 255) : null;
      }

      this._setDefaultAppearance({
        xref: parameters.xref,
        extra: `${this.borderStyle.width} w`,
        strokeColor,
        fillColor,
        pointsCallback: (buffer, points) => {
          const x = points[2].x + this.borderStyle.width / 2;
          const y = points[2].y + this.borderStyle.width / 2;
          const width = points[3].x - points[2].x - this.borderStyle.width;
          const height = points[1].y - points[3].y - this.borderStyle.width;
          buffer.push(`${x} ${y} ${width} ${height} re`);

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