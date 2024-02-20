function TimeAxis(body, options) {
    this.dom = {
      foreground: null,
      lines: [],
      majorTexts: [],
      minorTexts: [],
      redundant: {
        lines: [],
        majorTexts: [],
        minorTexts: []
      }
    };
    this.props = {
      range: {
        start: 0,
        end: 0,
        minimumStep: 0
      },
      lineTop: 0
    };

    this.defaultOptions = {
      orientation: {
        axis: 'bottom'
      }, // axis orientation: 'top' or 'bottom'
      showMinorLabels: true,
      showMajorLabels: true,
      format: TimeStep.FORMAT,
      moment: moment,
      timeAxis: null
    };
    this.options = util.extend({}, this.defaultOptions);

    this.body = body;

    // create the HTML DOM
    this._create();

    this.setOptions(options);
  }