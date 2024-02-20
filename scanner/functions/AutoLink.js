function AutoLink(context) {
    var _this = this;

    AutoLink_classCallCheck(this, AutoLink);

    this.context = context;
    this.options = context.options;
    this.events = {
      'summernote.keyup': function summernoteKeyup(we, e) {
        if (!e.isDefaultPrevented()) {
          _this.handleKeyup(e);
        }
      },
      'summernote.keydown': function summernoteKeydown(we, e) {
        _this.handleKeydown(e);
      }
    };
  }