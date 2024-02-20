function LazyResult(processor, css, opts) {
    var _this = this;
    _classCallCheck(this, LazyResult);
    this.stringified = false;
    this.processed = false;
    var root;
    if (_typeof(css) === 'object' && css !== null && (css.type === 'root' || css.type === 'document')) {
      root = cleanMarks(css);
    } else if (css instanceof LazyResult || css instanceof Result) {
      root = cleanMarks(css.root);
      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser = parse;
      if (opts.syntax) parser = opts.syntax.parse;
      if (opts.parser) parser = opts.parser;
      if (parser.parse) parser = parser.parse;
      try {
        root = parser(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }
      if (root && !root[my]) {
        /* c8 ignore next 2 */
        Container.rebuild(root);
      }
    }
    this.result = new Result(processor, root, opts);
    this.helpers = _objectSpread(_objectSpread({}, postcss), {}, {
      result: this.result,
      postcss: postcss
    });
    this.plugins = this.processor.plugins.map(function (plugin) {
      if (_typeof(plugin) === 'object' && plugin.prepare) {
        return _objectSpread(_objectSpread({}, plugin), plugin.prepare(_this.result));
      } else {
        return plugin;
      }
    });
  }