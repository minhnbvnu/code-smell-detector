function DataAxis(body, options, svg, linegraphOptions) {
    this.id = util.randomUUID();
    this.body = body;

    this.defaultOptions = {
      orientation: 'left', // supported: 'left', 'right'
      showMinorLabels: true,
      showMajorLabels: true,
      icons: true,
      majorLinesOffset: 7,
      minorLinesOffset: 4,
      labelOffsetX: 10,
      labelOffsetY: 2,
      iconWidth: 20,
      width: '40px',
      visible: true,
      alignZeros: true,
      left: {
        range: { min: undefined, max: undefined },
        format: function format(value) {
          return value;
        },
        title: { text: undefined, style: undefined }
      },
      right: {
        range: { min: undefined, max: undefined },
        format: function format(value) {
          return value;
        },
        title: { text: undefined, style: undefined }
      }
    };

    this.linegraphOptions = linegraphOptions;
    this.linegraphSVG = svg;
    this.props = {};
    this.DOMelements = { // dynamic elements
      lines: {},
      labels: {},
      title: {}
    };

    this.dom = {};

    this.range = { start: 0, end: 0 };

    this.options = util.extend({}, this.defaultOptions);
    this.conversionFactor = 1;

    this.setOptions(options);
    this.width = Number(('' + this.options.width).replace('px', ''));
    this.minWidth = this.width;
    this.height = this.linegraphSVG.offsetHeight;
    this.hidden = false;

    this.stepPixels = 25;
    this.zeroCrossing = -1;
    this.amountOfSteps = -1;

    this.lineOffset = 0;
    this.master = true;
    this.svgElements = {};
    this.iconsRemoved = false;

    this.groups = {};
    this.amountOfGroups = 0;

    // create the HTML DOM
    this._create();

    var me = this;
    this.body.emitter.on('verticalDrag', function () {
      me.dom.lineContainer.style.top = me.body.domProps.scrollTop + 'px';
    });
  }