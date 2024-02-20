function NodesHandler(body, images, groups, layoutEngine) {
      var _this = this;

      _classCallCheck(this, NodesHandler);

      this.body = body;
      this.images = images;
      this.groups = groups;
      this.layoutEngine = layoutEngine;

      // create the node API in the body container
      this.body.functions.createNode = this.create.bind(this);

      this.nodesListeners = {
        add: function add(event, params) {
          _this.add(params.items);
        },
        update: function update(event, params) {
          _this.update(params.items, params.data);
        },
        remove: function remove(event, params) {
          _this.remove(params.items);
        }
      };

      this.options = {};
      this.defaultOptions = {
        borderWidth: 1,
        borderWidthSelected: 2,
        brokenImage: undefined,
        color: {
          border: '#2B7CE9',
          background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          }
        },
        fixed: {
          x: false,
          y: false
        },
        font: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 0, // px
          strokeColor: '#ffffff',
          align: 'horizontal'
        },
        group: undefined,
        hidden: false,
        icon: {
          face: 'FontAwesome', //'FontAwesome',
          code: undefined, //'\uf007',
          size: 50, //50,
          color: '#2B7CE9' //'#aa00ff'
        },
        image: undefined, // --> URL
        label: undefined,
        labelHighlightBold: true,
        level: undefined,
        mass: 1,
        physics: true,
        scaling: {
          min: 10,
          max: 30,
          label: {
            enabled: false,
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
        shadow: {
          enabled: false,
          size: 10,
          x: 5,
          y: 5
        },
        shape: 'ellipse',
        shapeProperties: {
          borderDashes: false, // only for borders
          borderRadius: 6, // only for box shape
          useImageSize: false // only for image and circularImage shapes
        },
        size: 25,
        title: undefined,
        value: undefined,
        x: undefined,
        y: undefined
      };
      util.extend(this.options, this.defaultOptions);

      this.bindEventListeners();
    }