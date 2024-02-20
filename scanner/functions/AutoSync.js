function AutoSync(context) {
    var _this = this;

    AutoSync_classCallCheck(this, AutoSync);

    this.$note = context.layoutInfo.note;
    this.events = {
      'summernote.change': function summernoteChange() {
        _this.$note.val(context.invoke('code'));
      }
    };
  }