function ObjParser() {
    this.vertices = [];
    this.faces = [];
    this.commands = {
      v: (function(_this) {
        return function(data) {
          return _this.vertices.push(data.map(function(d) {
            return parseFloat(d);
          }));
        };
      })(this),
      f: (function(_this) {
        return function(data) {
          return _this.faces.push(data.map(function(d) {
            return parseInt(d);
          }));
        };
      })(this)
    };
  }