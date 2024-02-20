function Dynamics(extents1, opts) {
      var ref, ref1;
      this.extents = extents1;
      this.linesParams = bind(this.linesParams, this);
      this.updatePoint = bind(this.updatePoint, this);
      this.newPoint = bind(this.newPoint, this);
      this.timeToLeave = bind(this.timeToLeave, this);
      this.scaleZ = (ref = opts.scaleZ) != null ? ref : 0.0;
      this.onPlane = (ref1 = opts.onPlane) != null ? ref1 : 1 / 20;
      if (Math.abs(this.scaleZ) < 1e-5) {
        this.is3D = false;
        this.zAtTime = function(start, t) {
          return 0;
        };
        this.timeToLeaveZ = function(start) {
          return 2e308;
        };
        this.needsResetZ = (function(_this) {
          return function(z) {
            return false;
          };
        })(this);
      } else if (Math.abs(this.scaleZ - 1) < 1e-5) {
        this.is3D = true;
        this.scaleZ = 1.0;
        this.origLerpZ = linLerp(0.01, this.extents.z);
        this.zAtTime = function(start, t) {
          return start;
        };
        this.timeToLeaveZ = function(start) {
          return 2e308;
        };
        this.needsResetZ = (function(_this) {
          return function(z) {
            return false;
          };
        })(this);
      } else if (this.scaleZ < 1.0) {
        this.is3D = true;
        this.origLerpZ = expLerp(0.01, this.extents.z / this.scaleZ);
        this.newLerpZ = expLerp(this.extents.z, this.extents.z / this.scaleZ);
        this.zAtTime = (function(_this) {
          return function(start, t) {
            return start * Math.pow(_this.scaleZ, t);
          };
        })(this);
        this.timeToLeaveZ = (function(_this) {
          return function(start) {
            return Math.log(0.01 / Math.abs(start)) / Math.log(_this.scaleZ);
          };
        })(this);
        this.needsResetZ = (function(_this) {
          return function(z) {
            return Math.abs(z) < 0.01;
          };
        })(this);
      } else if (this.scaleZ > 1.0) {
        this.is3D = true;
        this.origLerpZ = expLerp(0.01 / this.scaleZ, this.extents.z);
        this.newLerpZ = expLerp(0.01 / this.scaleZ, 0.01);
        this.zAtTime = (function(_this) {
          return function(start, t) {
            return start * Math.pow(_this.scaleZ, t);
          };
        })(this);
        this.timeToLeaveZ = (function(_this) {
          return function(start) {
            return Math.log(_this.extents.z / Math.abs(start)) / Math.log(_this.scaleZ);
          };
        })(this);
        this.needsResetZ = (function(_this) {
          return function(z) {
            return Math.abs(z) > _this.extents.z;
          };
        })(this);
      }
      this.invScaleZ = this.is3D ? 1 / this.scaleZ : 0.0;
    }