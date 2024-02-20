function ImagePopover(context) {
    var _this = this;

    ImagePopover_classCallCheck(this, ImagePopover);

    this.context = context;
    this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
    this.editable = context.layoutInfo.editable[0];
    this.options = context.options;
    this.events = {
      'summernote.disable summernote.blur': function summernoteDisableSummernoteBlur() {
        _this.hide();
      }
    };
  }