function Graph3d(container, data, options) {
    if (!(this instanceof Graph3d)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // create variables and set default values
    this.containerElement = container;
    this.width = '400px';
    this.height = '400px';
    this.margin = 10; // px
    this.defaultXCenter = '55%';
    this.defaultYCenter = '50%';

    this.xLabel = 'x';
    this.yLabel = 'y';
    this.zLabel = 'z';

    var passValueFn = function passValueFn(v) {
      return v;
    };
    this.xValueLabel = passValueFn;
    this.yValueLabel = passValueFn;
    this.zValueLabel = passValueFn;

    this.filterLabel = 'time';
    this.legendLabel = 'value';

    this.style = Graph3d.STYLE.DOT;
    this.showPerspective = true;
    this.showGrid = true;
    this.keepAspectRatio = true;
    this.showShadow = false;
    this.showGrayBottom = false; // TODO: this does not work correctly
    this.showTooltip = false;
    this.verticalRatio = 0.5; // 0.1 to 1.0, where 1.0 results in a 'cube'

    this.animationInterval = 1000; // milliseconds
    this.animationPreload = false;

    this.camera = new Camera();
    this.camera.setArmRotation(1.0, 0.5);
    this.camera.setArmLength(1.7);
    this.eye = new Point3d(0, 0, -1); // TODO: set eye.z about 3/4 of the width of the window?

    this.dataTable = null; // The original data table
    this.dataPoints = null; // The table with point objects

    // the column indexes
    this.colX = undefined;
    this.colY = undefined;
    this.colZ = undefined;
    this.colValue = undefined;
    this.colFilter = undefined;

    this.xMin = 0;
    this.xStep = undefined; // auto by default
    this.xMax = 1;
    this.yMin = 0;
    this.yStep = undefined; // auto by default
    this.yMax = 1;
    this.zMin = 0;
    this.zStep = undefined; // auto by default
    this.zMax = 1;
    this.valueMin = 0;
    this.valueMax = 1;
    this.xBarWidth = 1;
    this.yBarWidth = 1;
    // TODO: customize axis range

    // colors
    this.axisColor = '#4D4D4D';
    this.gridColor = '#D3D3D3';
    this.dataColor = {
      fill: '#7DC1FF',
      stroke: '#3267D2',
      strokeWidth: 1 // px
    };

    // create a frame and canvas
    this.create();

    // apply options (also when undefined)
    this.setOptions(options);

    // apply data
    if (data) {
      this.setData(data);
    }
  }