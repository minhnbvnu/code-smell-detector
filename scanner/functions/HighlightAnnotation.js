constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.HIGHLIGHT;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const fillColor = this.color ? Array.from(this.color).map(c => c / 255) : [1, 1, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          fillColor,
          blendMode: "Multiply",
          pointsCallback: (buffer, points) => {
            buffer.push(`${points[0].x} ${points[0].y} m`);
            buffer.push(`${points[1].x} ${points[1].y} l`);
            buffer.push(`${points[3].x} ${points[3].y} l`);
            buffer.push(`${points[2].x} ${points[2].y} l`);
            buffer.push("f");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }