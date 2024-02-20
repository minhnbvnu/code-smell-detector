function LabeledPoints(view, opts1) {
      var col, colors, i, labelOpts, labels, labelsLive, len, len1, live, name, point, pointData, pointOpts, points, ref, ref1, ref2, ref3, ref4, ref5, u, v, z;
      this.opts = opts1;
      this.show = bind(this.show, this);
      this.hide = bind(this.hide, this);
      if (this.opts == null) {
        this.opts = {};
      }
      name = (ref = this.opts.name) != null ? ref : "labeled-points";
      points = this.opts.points;
      colors = this.opts.colors;
      labels = this.opts.labels;
      live = (ref1 = this.opts.live) != null ? ref1 : true;
      labelsLive = (ref2 = this.opts.labelsLive) != null ? ref2 : false;
      pointOpts = {
        id: name + "-drawn",
        classes: [name],
        points: "#" + name + "-points",
        colors: "#" + name + "-colors",
        color: "white",
        size: 15
      };
      extend(pointOpts, (ref3 = this.opts.pointOpts) != null ? ref3 : {});
      labelOpts = {
        id: name + "-labels",
        classes: [name],
        points: "#" + name + "-points",
        colors: "#" + name + "-colors",
        color: "white",
        outline: 0,
        background: [0, 0, 0, 0],
        size: 15,
        offset: [0, 25]
      };
      extend(labelOpts, (ref4 = this.opts.labelOpts) != null ? ref4 : {});
      for (i = u = 0, len = colors.length; u < len; i = ++u) {
        col = colors[i];
        if (col instanceof Color) {
          colors[i] = col.arr(1);
        }
      }
      this.hidden = false;
      pointData = [];
      for (v = 0, len1 = points.length; v < len1; v++) {
        point = points[v];
        if (point[2] == null) {
          point[2] = 0;
        }
      }
      for (i = z = 0, ref5 = points.length; 0 <= ref5 ? z < ref5 : z > ref5; i = 0 <= ref5 ? ++z : --z) {
        pointData.push(points[i]);
      }
      view.array({
        id: name + "-points",
        channels: 3,
        width: points.length,
        data: pointData,
        live: live
      }).array({
        id: name + "-colors",
        channels: 4,
        width: colors.length,
        data: colors,
        live: live
      });
      this.pts = view.point(pointOpts);
      if (labels != null) {
        view.text({
          id: name + "-text",
          live: labelsLive,
          width: labels.length,
          data: labels
        });
        this.labels = view.label(labelOpts);
      }
    }