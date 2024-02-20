function ItemSet(body, options) {
    this.body = body;

    this.defaultOptions = {
      type: null, // 'box', 'point', 'range', 'background'
      orientation: {
        item: 'bottom' // item orientation: 'top' or 'bottom'
      },
      align: 'auto', // alignment of box items
      stack: true,
      groupOrder: null,

      selectable: true,
      multiselect: false,

      editable: {
        updateTime: false,
        updateGroup: false,
        add: false,
        remove: false
      },

      snap: TimeStep.snap,

      onAdd: function onAdd(item, callback) {
        callback(item);
      },
      onUpdate: function onUpdate(item, callback) {
        callback(item);
      },
      onMove: function onMove(item, callback) {
        callback(item);
      },
      onRemove: function onRemove(item, callback) {
        callback(item);
      },
      onMoving: function onMoving(item, callback) {
        callback(item);
      },

      margin: {
        item: {
          horizontal: 10,
          vertical: 10
        },
        axis: 20
      }
    };

    // options is shared by this ItemSet and all its items
    this.options = util.extend({}, this.defaultOptions);

    // options for getting items from the DataSet with the correct type
    this.itemOptions = {
      type: { start: 'Date', end: 'Date' }
    };

    this.conversion = {
      toScreen: body.util.toScreen,
      toTime: body.util.toTime
    };
    this.dom = {};
    this.props = {};
    this.hammer = null;

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
    this.groups = {}; // Group object for every group
    this.groupIds = [];

    this.selection = []; // list with the ids of all selected nodes
    this.stackDirty = true; // if true, all items will be restacked on next redraw

    this.touchParams = {}; // stores properties while dragging
    // create the HTML DOM

    this._create();

    this.setOptions(options);
  }