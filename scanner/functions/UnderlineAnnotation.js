constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.UNDERLINE;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor,
          pointsCallback: (buffer, points) => {
            buffer.push(`${points[2].x} ${points[2].y} m`);
            buffer.push(`${points[3].x} ${points[3].y} l`);
            buffer.push("S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }