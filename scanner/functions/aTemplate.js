function aTemplate(opt) {
    var _this = this;

    _classCallCheck(this, aTemplate);

    this.atemplate = [];
    this.events = [];
    if (opt) {
      Object.keys(opt).forEach(function (key) {
        _this[key] = opt[key];
      });
    }
    if (!this.data) {
      this.data = {};
    }
    if (!this.templates) {
      this.templates = [];
    }
    var templates = this.templates;
    var length = templates.length;
    for (var i = 0, n = length; i < n; i += 1) {
      var template = this.templates[i];
      var html = (0, _util.selector)('#' + template).innerHTML;
      this.atemplate.push({ id: template, html: html, binded: false });
    }
  }