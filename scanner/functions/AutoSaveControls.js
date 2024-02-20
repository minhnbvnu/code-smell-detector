function AutoSaveControls(props) {
    _classCallCheck(this, AutoSaveControls);

    var _this = _possibleConstructorReturn(this, (AutoSaveControls.__proto__ || Object.getPrototypeOf(AutoSaveControls)).call(this, props));

    _this.state = {
      visible: false,
      list: [],
      selectedRowKeys: [],
      selectedKeyName: ""
    }, _this.onAutoSaveToggle = _this.onAutoSaveToggle.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.sendSavedItemToEditor = _this.sendSavedItemToEditor.bind(_this);
    _this.doDelete = _this.doDelete.bind(_this);
    _this.selectRow = _this.selectRow.bind(_this);
    return _this;
  }