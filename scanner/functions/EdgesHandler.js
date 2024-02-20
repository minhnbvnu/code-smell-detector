function EdgesHandler(body, images, groups) {
      var _this = this;

      _classCallCheck(this, EdgesHandler);

      this.body = body;
      this.images = images;
      this.groups = groups;

      // create the edge API in the body container
      this.body.functions.createEdge = this.create.bind(this);

      this.edgesListeners = {
        add: function add(event, params) {
          _this.add(params.items);
        },
        update: function update(event, params) {
          _this.update(params.items);
        },
        remove: function remove(event, params) {
          _this.remove(params.items);
        }
      };

      this.options = {};
      this.defaultOptions = {
        arrows: {
          to: { enabled: false, scaleFactor: 1 }, // boolean / {arrowScaleFactor:1} / {enabled: false, arrowScaleFactor:1}
          middle: { enabled: false, scaleFactor: 1 },
          from: { enabled: false, scaleFactor: 1 }
        },
        color: {
          color: '#848484',
          highlight: '#848484',
          hover: '#848484',
          inherit: 'from',
          opacity: 1.0
        },
        dashes: false,
        font: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 2, // px
          strokeColor: '#ffffff',
          align: 'horizontal'
        },
        hidden: false,
        hoverWidth: 1.5,
        label: undefined,
        labelHighlightBold: true,
        length: undefined,
        physics: true,
        scaling: {
          min: 1,
          max: 15,
          label: {
            enabled: true,
            min: 14,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
          customScalingFunction: function customScalingFunction(min, max, total, value) {
            if (max === min) {
              return 0.5;
            } else {
              var scale = 1 / (max - min);
              return Math.max(0, (value - min) * scale);
            }
          }
        },
        selectionWidth: 1.5,
        selfReferenceSize: 20,
        shadow: {
          enabled: false,
          size: 10,
          x: 5,
          y: 5
        },
        smooth: {
          enabled: true,
          type: 'dynamic',
          forceDirection: 'none',
          roundness: 0.5
        },
        title: undefined,
        width: 1,
        value: undefined
      };

      util.extend(this.options, this.defaultOptions);

      this.bindEventListeners();
    }