constructor(whitePoint, blackPoint, range) {
      super("Lab", 3);

      if (!whitePoint) {
        throw new _util.FormatError("WhitePoint missing - required for color space Lab");
      }

      blackPoint = blackPoint || [0, 0, 0];
      range = range || [-100, 100, -100, 100];
      this.XW = whitePoint[0];
      this.YW = whitePoint[1];
      this.ZW = whitePoint[2];
      this.amin = range[0];
      this.amax = range[1];
      this.bmin = range[2];
      this.bmax = range[3];
      this.XB = blackPoint[0];
      this.YB = blackPoint[1];
      this.ZB = blackPoint[2];

      if (this.XW < 0 || this.ZW < 0 || this.YW !== 1) {
        throw new _util.FormatError("Invalid WhitePoint components, no fallback available");
      }

      if (this.XB < 0 || this.YB < 0 || this.ZB < 0) {
        (0, _util.info)("Invalid BlackPoint, falling back to default");
        this.XB = this.YB = this.ZB = 0;
      }

      if (this.amin > this.amax || this.bmin > this.bmax) {
        (0, _util.info)("Invalid Range, falling back to defaults");
        this.amin = -100;
        this.amax = 100;
        this.bmin = -100;
        this.bmax = 100;
      }
    }