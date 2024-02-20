function LabeledVectors(view, opts1) {
      var col, colors, doZero, i, i1, labelOpts, labels, labelsLive, len, len1, len2, live, name, origins, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, u, v, vec, vectorData, vectorOpts, vectors, z, zeroData, zeroOpts, zeroThreshold;
      this.opts = opts1;
      this.show = bind(this.show, this);
      this.hide = bind(this.hide, this);
      if (this.opts == null) {
        this.opts = {};
      }
      name = (ref = this.opts.name) != null ? ref : "labeled";
      vectors = this.opts.vectors;
      colors = this.opts.colors;
      labels = this.opts.labels;
      origins = (ref1 = this.opts.origins) != null ? ref1 : (function() {
        var ref2, results, u;
        results = [];
        for (u = 0, ref2 = vectors.length; 0 <= ref2 ? u < ref2 : u > ref2; 0 <= ref2 ? u++ : u--) {
          results.push([0, 0, 0]);
        }
        return results;
      })();
      live = (ref2 = this.opts.live) != null ? ref2 : true;
      labelsLive = (ref3 = this.opts.labelsLive) != null ? ref3 : false;
      vectorOpts = {
        id: name + "-vectors-drawn",
        classes: [name],
        points: "#" + name + "-vectors",
        colors: "#" + name + "-colors",
        color: "white",
        end: true,
        size: 5,
        width: 5
      };
      extend(vectorOpts, (ref4 = this.opts.vectorOpts) != null ? ref4 : {});
      labelOpts = {
        id: name + "-vector-labels",
        classes: [name],
        colors: "#" + name + "-colors",
        color: "white",
        outline: 0,
        background: [0, 0, 0, 0],
        size: 15,
        offset: [0, 25]
      };
      extend(labelOpts, (ref5 = this.opts.labelOpts) != null ? ref5 : {});
      doZero = (ref6 = this.opts.zeroPoints) != null ? ref6 : false;
      zeroOpts = {
        id: name + "-zero-points",
        classes: [name],
        points: "#" + name + "-zeros",
        colors: "#" + name + "-zero-colors",
        color: "white",
        size: 20
      };
      extend(zeroOpts, (ref7 = this.opts.zeroOpts) != null ? ref7 : {});
      zeroThreshold = (ref8 = this.opts.zeroThreshold) != null ? ref8 : 0.0;
      for (i = u = 0, len = colors.length; u < len; i = ++u) {
        col = colors[i];
        if (col instanceof Color) {
          colors[i] = col.arr(1);
        }
      }
      this.hidden = false;
      vectorData = [];
      for (v = 0, len1 = vectors.length; v < len1; v++) {
        vec = vectors[v];
        if (vec[2] == null) {
          vec[2] = 0;
        }
      }
      for (z = 0, len2 = origins.length; z < len2; z++) {
        vec = origins[z];
        if (vec[2] == null) {
          vec[2] = 0;
        }
      }
      for (i = i1 = 0, ref9 = vectors.length; 0 <= ref9 ? i1 < ref9 : i1 > ref9; i = 0 <= ref9 ? ++i1 : --i1) {
        vectorData.push(origins[i]);
        vectorData.push(vectors[i]);
      }
      view.array({
        id: name + "-vectors",
        channels: 3,
        width: vectors.length,
        items: 2,
        data: vectorData,
        live: live
      }).array({
        id: name + "-colors",
        channels: 4,
        width: colors.length,
        data: colors,
        live: live
      });
      this.vecs = view.vector(vectorOpts);
      if (labels != null) {
        view.array({
          channels: 3,
          width: vectors.length,
          expr: function(emit, i) {
            return emit((vectors[i][0] + origins[i][0]) / 2, (vectors[i][1] + origins[i][1]) / 2, (vectors[i][2] + origins[i][2]) / 2);
          },
          live: live
        }).text({
          id: name + "-text",
          live: labelsLive,
          width: labels.length,
          data: labels
        });
        this.labels = view.label(labelOpts);
      }
      if (doZero) {
        zeroData = (function() {
          var j1, ref10, results;
          results = [];
          for (j1 = 0, ref10 = vectors.length; 0 <= ref10 ? j1 < ref10 : j1 > ref10; 0 <= ref10 ? j1++ : j1--) {
            results.push([0, 0, 0]);
          }
          return results;
        })();
        view.array({
          id: name + "-zero-colors",
          channels: 4,
          width: vectors.length,
          live: live,
          expr: function(emit, i) {
            if (vectors[i][0] * vectors[i][0] + vectors[i][1] * vectors[i][1] + vectors[i][2] * vectors[i][2] <= zeroThreshold * zeroThreshold) {
              return emit.apply(null, colors[i]);
            } else {
              return emit(0, 0, 0, 0);
            }
          }
        }).array({
          id: name + "-zeros",
          channels: 3,
          width: vectors.length,
          data: zeroData,
          live: false
        });
        this.zeroPoints = view.point(zeroOpts);
        this.zeroPoints.bind('visible', (function(_this) {
          return function() {
            var j1, ref10;
            if (_this.hidden) {
              return false;
            }
            for (i = j1 = 0, ref10 = vectors.length; 0 <= ref10 ? j1 < ref10 : j1 > ref10; i = 0 <= ref10 ? ++j1 : --j1) {
              if (vectors[i][0] * vectors[i][0] + vectors[i][1] * vectors[i][1] + vectors[i][2] * vectors[i][2] <= zeroThreshold * zeroThreshold) {
                return true;
              }
            }
            return false;
          };
        })(this));
      }
    }