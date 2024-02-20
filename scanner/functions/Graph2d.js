function Graph2d(container, items, groups, options) {
    // if the third element is options, the forth is groups (optionally);
    if (!(Array.isArray(groups) || groups instanceof DataSet) && groups instanceof Object) {
      var forthArgument = options;
      options = groups;
      groups = forthArgument;
    }

    var me = this;
    this.defaultOptions = {
      start: null,
      end: null,

      autoResize: true,

      orientation: {
        axis: 'bottom', // axis orientation: 'bottom', 'top', or 'both'
        item: 'bottom' // not relevant for Graph2d
      },

      moment: moment,

      width: null,
      height: null,
      maxHeight: null,
      minHeight: null
    };
    this.options = util.deepExtend({}, this.defaultOptions);

    // Create the DOM, props, and emitter
    this._create(container);

    // all components listed here will be repainted automatically
    this.components = [];

    this.body = {
      dom: this.dom,
      domProps: this.props,
      emitter: {
        on: this.on.bind(this),
        off: this.off.bind(this),
        emit: this.emit.bind(this)
      },
      hiddenDates: [],
      util: {
        toScreen: me._toScreen.bind(me),
        toGlobalScreen: me._toGlobalScreen.bind(me), // this refers to the root.width
        toTime: me._toTime.bind(me),
        toGlobalTime: me._toGlobalTime.bind(me)
      }
    };

    // range
    this.range = new Range(this.body);
    this.components.push(this.range);
    this.body.range = this.range;

    // time axis
    this.timeAxis = new TimeAxis(this.body);
    this.components.push(this.timeAxis);
    //this.body.util.snap = this.timeAxis.snap.bind(this.timeAxis);

    // current time bar
    this.currentTime = new CurrentTime(this.body);
    this.components.push(this.currentTime);

    // item set
    this.linegraph = new LineGraph(this.body);
    this.components.push(this.linegraph);

    this.itemsData = null; // DataSet
    this.groupsData = null; // DataSet

    this.on('tap', function (event) {
      me.emit('click', me.getEventProperties(event));
    });
    this.on('doubletap', function (event) {
      me.emit('doubleClick', me.getEventProperties(event));
    });
    this.dom.root.oncontextmenu = function (event) {
      me.emit('contextmenu', me.getEventProperties(event));
    };

    // apply options
    if (options) {
      this.setOptions(options);
    }

    // IMPORTANT: THIS HAPPENS BEFORE SET ITEMS!
    if (groups) {
      this.setGroups(groups);
    }

    // create itemset
    if (items) {
      this.setItems(items);
    } else {
      this._redraw();
    }
  }