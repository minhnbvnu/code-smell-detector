constructor(whitePoint, blackPoint, gamma) {
      super("CalGray", 1);

      if (!whitePoint) {
        throw new _util.FormatError("WhitePoint missing - required for color space CalGray");
      }

      blackPoint = blackPoint || [0, 0, 0];
      gamma = gamma || 1;
      this.XW = whitePoint[0];
      this.YW = whitePoint[1];
      this.ZW = whitePoint[2];
      this.XB = blackPoint[0];
      this.YB = blackPoint[1];
      this.ZB = blackPoint[2];
      this.G = gamma;

      if (this.XW < 0 || this.ZW < 0 || this.YW !== 1) {
        throw new _util.FormatError(`Invalid WhitePoint components for ${this.name}` + ", no fallback available");
      }

      if (this.XB < 0 || this.YB < 0 || this.ZB < 0) {
        (0, _util.info)(`Invalid BlackPoint for ${this.name}, falling back to default.`);
        this.XB = this.YB = this.ZB = 0;
      }

      if (this.XB !== 0 || this.YB !== 0 || this.ZB !== 0) {
        (0, _util.warn)(`${this.name}, BlackPoint: XB: ${this.XB}, YB: ${this.YB}, ` + `ZB: ${this.ZB}, only default values are supported.`);
      }

      if (this.G < 1) {
        (0, _util.info)(`Invalid Gamma: ${this.G} for ${this.name}, ` + "falling back to default.");
        this.G = 1;
      }
    }