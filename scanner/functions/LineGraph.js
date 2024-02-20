function LineGraph(body, options) {
    this.id = util.randomUUID();
    this.body = body;

    this.defaultOptions = {
      yAxisOrientation: 'left',
      defaultGroup: 'default',
      sort: true,
      sampling: true,
      stack: false,
      graphHeight: '400px',
      shaded: {
        enabled: false,
        orientation: 'bottom' // top, bottom
      },
      style: 'line', // line, bar
      barChart: {
        width: 50,
        sideBySide: false,
        align: 'center' // left, center, right
      },
      interpolation: {
        enabled: true,
        parametrization: 'centripetal', // uniform (alpha = 0.0), chordal (alpha = 1.0), centripetal (alpha = 0.5)
        alpha: 0.5
      },
      drawPoints: {
        enabled: true,
        size: 6,
        style: 'square' // square, circle
      },
      dataAxis: {
        showMinorLabels: true,
        showMajorLabels: true,
        icons: false,
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
      },
      legend: {
        enabled: false,
        icons: true,
        left: {
          visible: true,
          position: 'top-left' // top/bottom - left,right
        },
        right: {
          visible: true,
          position: 'top-right' // top/bottom - left,right
        }
      },
      groups: {
        visibility: {}
      }
    };

    // options is shared by this ItemSet and all its items
    this.options = util.extend({}, this.defaultOptions);
    this.dom = {};
    this.props = {};
    this.hammer = null;
    this.groups = {};
    this.abortedGraphUpdate = false;
    this.updateSVGheight = false;
    this.updateSVGheightOnResize = false;

    var me = this;
    this.itemsData = null; // DataSet
    this.groupsData = null; // DataSet

    // listeners for the DataSet of the items
    this.itemListeners = {
      'add': function add(event, params, senderId) {
        me._onAdd(params.items);
      },
      'update': function update(event, params, senderId) {
        me._onUpdate(params.items);
      },
      'remove': function remove(event, params, senderId) {
        me._onRemove(params.items);
      }
    };

    // listeners for the DataSet of the groups
    this.groupListeners = {
      'add': function add(event, params, senderId) {
        me._onAddGroups(params.items);
      },
      'update': function update(event, params, senderId) {
        me._onUpdateGroups(params.items);
      },
      'remove': function remove(event, params, senderId) {
        me._onRemoveGroups(params.items);
      }
    };

    this.items = {}; // object with an Item for every data item
    this.selection = []; // list with the ids of all selected nodes
    this.lastStart = this.body.range.start;
    this.touchParams = {}; // stores properties while dragging

    this.svgElements = {};
    this.setOptions(options);
    this.groupsUsingDefaultStyles = [0];
    this.COUNTER = 0;
    this.body.emitter.on('rangechanged', function () {
      me.lastStart = me.body.range.start;
      me.svg.style.left = util.option.asSize(-me.props.width);
      me.redraw.call(me, true);
    });

    // create the HTML DOM
    this._create();
    this.framework = { svg: this.svg, svgElements: this.svgElements, options: this.options, groups: this.groups };
    this.body.emitter.emit('change');
  }