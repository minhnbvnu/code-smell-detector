constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.LINE;
    const lineCoordinates = parameters.dict.getArray("L");
    this.data.lineCoordinates = _util.Util.normalizeRect(lineCoordinates);

    if (!this.appearance) {
      const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];
      const borderWidth = this.borderStyle.width;

      if ((0, _util.isArrayEqual)(this.rectangle, [0, 0, 0, 0])) {
        this.rectangle = [this.data.lineCoordinates[0] - 2 * borderWidth, this.data.lineCoordinates[1] - 2 * borderWidth, this.data.lineCoordinates[2] + 2 * borderWidth, this.data.lineCoordinates[3] + 2 * borderWidth];
      }

      this._setDefaultAppearance({
        xref: parameters.xref,
        extra: `${borderWidth} w`,
        strokeColor,
        pointsCallback: (buffer, points) => {
          buffer.push(`${lineCoordinates[0]} ${lineCoordinates[1]} m`);
          buffer.push(`${lineCoordinates[2]} ${lineCoordinates[3]} l`);
          buffer.push("S");
          return [points[0].x - borderWidth, points[1].x + borderWidth, points[3].y - borderWidth, points[1].y + borderWidth];
        }
      });
    }
  }