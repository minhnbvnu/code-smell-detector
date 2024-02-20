function LinearCombo(view, opts) {
      var c, coeffVars, coeffs, col, color1, color2, color3, colors, combine, i, labelOpts, labels, len, len1, lineOpts, name, numVecs, pointColor, pointOpts, ref, ref1, ref2, ref3, ref4, ref5, u, v, vec, vector1, vector2, vector3, vectors;
      name = (ref = opts.name) != null ? ref : 'lincombo';
      vectors = opts.vectors;
      colors = opts.colors;
      pointColor = (ref1 = opts.pointColor) != null ? ref1 : new Color("red");
      labels = opts.labels;
      coeffs = opts.coeffs;
      coeffVars = (ref2 = opts.coeffVars) != null ? ref2 : ['x', 'y', 'z'];
      if (pointColor instanceof Color) {
        pointColor = pointColor.arr();
      }
      c = function(i) {
        return coeffs[coeffVars[i]];
      };
      lineOpts = {
        classes: [name],
        points: "#" + name + "-points",
        colors: "#" + name + "-colors",
        color: "white",
        opacity: 0.75,
        width: 3,
        zIndex: 1
      };
      extend(lineOpts, (ref3 = opts.lineOpts) != null ? ref3 : {});
      pointOpts = {
        classes: [name],
        points: "#" + name + "-combo",
        color: pointColor,
        zIndex: 2,
        size: 15
      };
      extend(pointOpts, (ref4 = opts.pointOpts) != null ? ref4 : {});
      labelOpts = {
        classes: [name],
        outline: 0,
        background: [0, 0, 0, 0],
        color: pointColor,
        offset: [0, 25],
        zIndex: 3,
        size: 15
      };
      extend(labelOpts, (ref5 = opts.labelOpts) != null ? ref5 : {});
      numVecs = vectors.length;
      for (u = 0, len = vectors.length; u < len; u++) {
        vec = vectors[u];
        if (vec[2] == null) {
          vec[2] = 0;
        }
      }
      vector1 = vectors[0];
      vector2 = vectors[1];
      vector3 = vectors[2];
      for (i = v = 0, len1 = colors.length; v < len1; i = ++v) {
        col = colors[i];
        if (col instanceof Color) {
          colors[i] = col.arr(1);
        }
      }
      color1 = colors[0];
      color2 = colors[1];
      color3 = colors[2];
      switch (numVecs) {
        case 1:
          combine = (function(_this) {
            return function() {
              return _this.combo = [vector1[0] * c(0), vector1[1] * c(0), vector1[2] * c(0)];
            };
          })(this);
          view.array({
            id: name + "-points",
            channels: 3,
            width: 2,
            items: 1,
            expr: function(emit, i) {
              if (i === 0) {
                return emit(0, 0, 0);
              } else {
                return emit(vector1[0] * c(0), vector1[1] * c(0), vector1[2] * c(0));
              }
            }
          }).array({
            id: name + "-colors",
            channels: 4,
            width: 1,
            items: 1,
            data: [color1]
          }).array({
            id: name + "-combo",
            channels: 3,
            width: 1,
            expr: function(emit) {
              return emit.apply(null, combine());
            }
          });
          break;
        case 2:
          combine = (function(_this) {
            return function() {
              return _this.combo = [vector1[0] * c(0) + vector2[0] * c(1), vector1[1] * c(0) + vector2[1] * c(1), vector1[2] * c(0) + vector2[2] * c(1)];
            };
          })(this);
          view.array({
            id: name + "-points",
            channels: 3,
            width: 2,
            items: 4,
            expr: function(emit, i) {
              var vec1, vec12, vec2;
              vec1 = [vector1[0] * c(0), vector1[1] * c(0), vector1[2] * c(0)];
              vec2 = [vector2[0] * c(1), vector2[1] * c(1), vector2[2] * c(1)];
              vec12 = [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
              if (i === 0) {
                emit(0, 0, 0);
                emit(0, 0, 0);
                emit.apply(null, vec1);
                return emit.apply(null, vec2);
              } else {
                emit.apply(null, vec1);
                emit.apply(null, vec2);
                emit.apply(null, vec12);
                return emit.apply(null, vec12);
              }
            }
          }).array({
            id: name + "-colors",
            channels: 4,
            width: 2,
            items: 4,
            data: [color1, color2, color2, color1, color1, color2, color2, color1]
          }).array({
            id: name + "-combo",
            channels: 3,
            width: 1,
            expr: function(emit) {
              return emit.apply(null, combine());
            }
          });
          break;
        case 3:
          combine = (function(_this) {
            return function() {
              return _this.combo = [vector1[0] * c(0) + vector2[0] * c(1) + vector3[0] * c(2), vector1[1] * c(0) + vector2[1] * c(1) + vector3[1] * c(2), vector1[2] * c(0) + vector2[2] * c(1) + vector3[2] * c(2)];
            };
          })(this);
          view.array({
            id: name + "-points",
            channels: 3,
            width: 2,
            items: 12,
            expr: function(emit, i) {
              var vec1, vec12, vec123, vec13, vec2, vec23, vec3;
              vec1 = [vector1[0] * c(0), vector1[1] * c(0), vector1[2] * c(0)];
              vec2 = [vector2[0] * c(1), vector2[1] * c(1), vector2[2] * c(1)];
              vec3 = [vector3[0] * c(2), vector3[1] * c(2), vector3[2] * c(2)];
              vec12 = [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
              vec13 = [vec1[0] + vec3[0], vec1[1] + vec3[1], vec1[2] + vec3[2]];
              vec23 = [vec2[0] + vec3[0], vec2[1] + vec3[1], vec2[2] + vec3[2]];
              vec123 = [vec1[0] + vec2[0] + vec3[0], vec1[1] + vec2[1] + vec3[1], vec1[2] + vec2[2] + vec3[2]];
              if (i === 0) {
                emit(0, 0, 0);
                emit(0, 0, 0);
                emit(0, 0, 0);
                emit.apply(null, vec1);
                emit.apply(null, vec1);
                emit.apply(null, vec2);
                emit.apply(null, vec2);
                emit.apply(null, vec3);
                emit.apply(null, vec3);
                emit.apply(null, vec12);
                emit.apply(null, vec13);
                return emit.apply(null, vec23);
              } else {
                emit.apply(null, vec1);
                emit.apply(null, vec2);
                emit.apply(null, vec3);
                emit.apply(null, vec12);
                emit.apply(null, vec13);
                emit.apply(null, vec12);
                emit.apply(null, vec23);
                emit.apply(null, vec13);
                emit.apply(null, vec23);
                emit.apply(null, vec123);
                emit.apply(null, vec123);
                return emit.apply(null, vec123);
              }
            }
          }).array({
            id: name + "-colors",
            channels: 4,
            width: 2,
            items: 12,
            data: [color1, color2, color3, color2, color3, color1, color3, color1, color2, color3, color2, color1, color1, color2, color3, color2, color3, color1, color3, color1, color2, color3, color2, color1]
          }).array({
            id: name + "-combo",
            channels: 3,
            width: 1,
            expr: function(emit) {
              return emit.apply(null, combine());
            }
          });
      }
      view.line(lineOpts).point(pointOpts);
      if (labels != null) {
        view.text({
          live: true,
          width: 1,
          expr: function(emit) {
            var add, b, cc, ret;
            ret = c(0).toFixed(2) + labels[0];
            if (numVecs >= 2) {
              b = Math.abs(c(1));
              add = c(1) >= 0 ? "+" : "-";
              ret += add + b.toFixed(2) + labels[1];
            }
            if (numVecs >= 3) {
              cc = Math.abs(c(2));
              add = c(2) >= 0 ? "+" : "-";
              ret += add + cc.toFixed(2) + labels[2];
            }
            return emit(ret);
          }
        }).label(labelOpts);
      }
      this.combine = combine;
    }