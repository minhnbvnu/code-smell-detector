function DynamicsView(opts) {
      this.randomizeCoords = bind(this.randomizeCoords, this);
      this.loadDynamics = bind(this.loadDynamics, this);
      this.updateView = bind(this.updateView, this);
      this.setCoords = bind(this.setCoords, this);
      var base, base1, base2, ref, ref1, ref2, ref3, ref4, ref5;
      if (opts == null) {
        opts = {};
      }
      this.is3D = (ref = opts.is3D) != null ? ref : false;
      this.axisColors = (ref1 = (ref2 = opts.axisColors) != null ? ref2.slice() : void 0) != null ? ref1 : [];
      this.refColor = (ref3 = opts.refColor) != null ? ref3 : "rgb(80, 120, 255)";
      this.timer = (ref4 = opts.timer) != null ? ref4 : true;
      this.axisOpts = {
        end: false,
        width: 3,
        zBias: -1,
        depth: 1,
        color: "black",
        range: [-10, 10]
      };
      extend(this.axisOpts, (ref5 = opts.axisOpts) != null ? ref5 : {});
      if ((base = this.axisColors)[0] == null) {
        base[0] = [0, 0, 0, 0.3];
      }
      if ((base1 = this.axisColors)[1] == null) {
        base1[1] = [0, 0, 0, 0.3];
      }
      if ((base2 = this.axisColors)[2] == null) {
        base2[2] = [0, 0, 0, 0.3];
      }
      this.mathbox = null;
      this.view0 = null;
      this.view = null;
      this.initialized = false;
      this.shaderElt = null;
      this.linesElt = null;
      this.linesDataElt = null;
    }