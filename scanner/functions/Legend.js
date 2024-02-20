function Legend(body, options, side, linegraphOptions) {
    this.body = body;
    this.defaultOptions = {
      enabled: true,
      icons: true,
      iconSize: 20,
      iconSpacing: 6,
      left: {
        visible: true,
        position: 'top-left' // top/bottom - left,center,right
      },
      right: {
        visible: true,
        position: 'top-left' // top/bottom - left,center,right
      }
    };
    this.side = side;
    this.options = util.extend({}, this.defaultOptions);
    this.linegraphOptions = linegraphOptions;

    this.svgElements = {};
    this.dom = {};
    this.groups = {};
    this.amountOfGroups = 0;
    this._create();

    this.setOptions(options);
  }