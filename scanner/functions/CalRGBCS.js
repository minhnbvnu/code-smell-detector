constructor(whitePoint, blackPoint, gamma, matrix) {
      super("CalRGB", 3);

      if (!whitePoint) {
        throw new _util.FormatError("WhitePoint missing - required for color space CalRGB");
      }

      blackPoint = blackPoint || new Float32Array(3);
      gamma = gamma || new Float32Array([1, 1, 1]);
      matrix = matrix || new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
      const XW = whitePoint[0];
      const YW = whitePoint[1];
      const ZW = whitePoint[2];
      this.whitePoint = whitePoint;
      const XB = blackPoint[0];
      const YB = blackPoint[1];
      const ZB = blackPoint[2];
      this.blackPoint = blackPoint;
      this.GR = gamma[0];
      this.GG = gamma[1];
      this.GB = gamma[2];
      this.MXA = matrix[0];
      this.MYA = matrix[1];
      this.MZA = matrix[2];
      this.MXB = matrix[3];
      this.MYB = matrix[4];
      this.MZB = matrix[5];
      this.MXC = matrix[6];
      this.MYC = matrix[7];
      this.MZC = matrix[8];

      if (XW < 0 || ZW < 0 || YW !== 1) {
        throw new _util.FormatError(`Invalid WhitePoint components for ${this.name}` + ", no fallback available");
      }

      if (XB < 0 || YB < 0 || ZB < 0) {
        (0, _util.info)(`Invalid BlackPoint for ${this.name} [${XB}, ${YB}, ${ZB}], ` + "falling back to default.");
        this.blackPoint = new Float32Array(3);
      }

      if (this.GR < 0 || this.GG < 0 || this.GB < 0) {
        (0, _util.info)(`Invalid Gamma [${this.GR}, ${this.GG}, ${this.GB}] for ` + `${this.name}, falling back to default.`);
        this.GR = this.GG = this.GB = 1;
      }
    }