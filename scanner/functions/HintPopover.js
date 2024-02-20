function HintPopover(context) {
    var _this = this;

    HintPopover_classCallCheck(this, HintPopover);

    this.context = context;
    this.ui = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default.a.summernote.ui;
    this.$editable = context.layoutInfo.editable;
    this.options = context.options;
    this.hint = this.options.hint || [];
    this.direction = this.options.hintDirection || 'bottom';
    this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
    this.events = {
      'summernote.keyup': function summernoteKeyup(we, e) {
        if (!e.isDefaultPrevented()) {
          _this.handleKeyup(e);
        }
      },
      'summernote.keydown': function summernoteKeydown(we, e) {
        _this.handleKeydown(e);
      },
      'summernote.disable summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteDialogShownSummernoteBlur() {
        _this.hide();
      }
    };
  }