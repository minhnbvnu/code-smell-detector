function RRMatrix(numRows, numCols, view, mathbox, opts) {
      var empty, i, j, l, len, m, name, o, prop, q, ref, ref1, ref2, ref3, ref4, ref5, s, startAugmented, state, t, u;
      this.numRows = numRows;
      this.numCols = numCols;
      this.view = view;
      this.resize = bind(this.resize, this);
      this.alignBaselines = bind(this.alignBaselines, this);
      this.htmlMatrix = bind(this.htmlMatrix, this);
      this.jumpState = bind(this.jumpState, this);
      this.computePositions = bind(this.computePositions, this);
      this._id = bind(this._id, this);
      ref = opts || {}, name = ref.name, this.fontSize = ref.fontSize, this.rowHeight = ref.rowHeight, this.rowSpacing = ref.rowSpacing, this.defSpeed = ref.defSpeed, this.colSpacing = ref.colSpacing, this.augmentCol = ref.augmentCol, startAugmented = ref.startAugmented;
      if (name == null) {
        name = "rrmat";
      }
      if (this.fontSize == null) {
        this.fontSize = 20;
      }
      if (this.rowHeight == null) {
        this.rowHeight = this.fontSize * 1.2;
      }
      if (this.rowSpacing == null) {
        this.rowSpacing = this.fontSize;
      }
      if (this.colSpacing == null) {
        this.colSpacing = this.fontSize;
      }
      this.matHeight = this.rowHeight * this.numRows + this.rowSpacing * (this.numRows - 1);
      if (startAugmented == null) {
        startAugmented = this.augmentCol != null;
      }
      if (this.defSpeed == null) {
        this.defSpeed = 1.0;
      }
      this.domClass = MathBox.DOM.createClass({
        render: (function(_this) {
          return function(el, props, children) {
            props = deepCopy(props);
            props.innerHTML = children;
            props.innerHTML += '<span class="baseline-detect"></span>';
            return el('span', props);
          };
        })(this)
      });
      this.timers = [];
      this.swapLineSamples = 30;
      this.matrixElts = [];
      this.multFlyerElt = void 0;
      this.addFlyerElts = [];
      this.rrepParenLeftElt = void 0;
      this.rrepParenRightElt = void 0;
      state = new State(this);
      state.addVal({
        key: 'positions',
        val: makeArray(this.numRows + 4, this.numCols, [0, 0, 0]),
        copy: deepCopy,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.positions.set('data', val);
          };
        })(this)
      });
      for (j = l = 0, ref1 = this.numCols; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
        for (i = m = 0; m <= 3; i = ++m) {
          state.positions[this.numRows + i][j] = [1000, -1000, 0];
        }
      }
      state.addVal({
        key: 'matWidth',
        val: 0.0
      });
      state.addVal({
        key: 'html',
        val: makeArray(this.numRows + 4, this.numCols, ''),
        copy: deepCopy
      });
      state.addVal({
        key: 'styles',
        val: makeArray(this.numRows + 4, this.numCols, {}),
        copy: deepCopy,
        install: (function(_this) {
          return function(rrmat, val) {
            var app;
            app = function(a, b) {
              var k, v;
              for (k in a) {
                v = a[k];
                if (b[k] !== v) {
                  b[k] = v;
                }
              }
              return null;
            };
            return rrmat.onNextFrame(1, function() {
              var o, q, ref2, ref3, ref4, s;
              for (i = o = 0, ref2 = _this.numRows; 0 <= ref2 ? o < ref2 : o > ref2; i = 0 <= ref2 ? ++o : --o) {
                for (j = q = 0, ref3 = _this.numCols; 0 <= ref3 ? q < ref3 : q > ref3; j = 0 <= ref3 ? ++q : --q) {
                  app(val[i][j], _this.matrixElts[i][j].style);
                }
              }
              app(val[_this.numRows][0], _this.multFlyerElt.style);
              for (j = s = 0, ref4 = _this.numCols; 0 <= ref4 ? s < ref4 : s > ref4; j = 0 <= ref4 ? ++s : --s) {
                app(val[_this.numRows + 1][j], _this.addFlyerElts[j].style);
              }
              app(val[_this.numRows + 2][0], _this.rrepParenLeftElt.style);
              return app(val[_this.numRows + 3][0], _this.rrepParenRightElt.style);
            });
          };
        })(this)
      });
      empty = {};
      ref2 = this.styleKeys;
      for (o = 0, len = ref2.length; o < len; o++) {
        prop = ref2[o];
        empty[prop] = '';
      }
      empty.transition = '';
      for (j = q = 0, ref3 = this.numCols; 0 <= ref3 ? q < ref3 : q > ref3; j = 0 <= ref3 ? ++q : --q) {
        for (i = s = 0, ref4 = this.numRows + 3; 0 <= ref4 ? s <= ref4 : s >= ref4; i = 0 <= ref4 ? ++s : --s) {
          state.styles[i][j] = deepCopy(empty);
        }
      }
      for (i = t = 0; t <= 3; i = ++t) {
        for (j = u = 0, ref5 = this.numCols; 0 <= ref5 ? u < ref5 : u > ref5; j = 0 <= ref5 ? ++u : --u) {
          state.styles[this.numRows + i][j].opacity = 0;
        }
      }
      state.addVal({
        key: 'matrix',
        val: makeArray(this.numRows, this.rumCols, 0),
        copy: deepCopy
      });
      state.addVal({
        key: 'bracket',
        val: makeArray(4, 2, 0),
        copy: deepCopy,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.bracket.set('data', val);
          };
        })(this)
      });
      state.addVal({
        key: 'swapLine',
        val: makeArray(this.swapLineSamples + 1, 2, 0),
        copy: deepCopy,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.swapLine.set('data', val);
          };
        })(this)
      });
      state.addVal({
        key: 'swapOpacity',
        val: 0.0,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.swapLineGeom.set('opacity', val);
          };
        })(this)
      });
      state.addVal({
        key: 'augment',
        val: [[0, 0], [0, 0]],
        copy: deepCopy,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.augment.set('data', val);
          };
        })(this)
      });
      state.addVal({
        key: 'doAugment',
        val: startAugmented,
        install: (function(_this) {
          return function(rrmat, val) {
            return _this.augmentGeom.set('visible', val);
          };
        })(this)
      });
      state.addVal({
        key: 'caption',
        val: ''
      });
      RRMatrix.__super__.constructor.call(this, name, state, mathbox);
      this.createMathbox();
    }