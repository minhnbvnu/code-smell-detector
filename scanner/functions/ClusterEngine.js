function ClusterEngine(body) {
      var _this = this;

      _classCallCheck(this, ClusterEngine);

      this.body = body;
      this.clusteredNodes = {};

      this.options = {};
      this.defaultOptions = {};
      util.extend(this.options, this.defaultOptions);

      this.body.emitter.on('_resetData', function () {
        _this.clusteredNodes = {};
      });
    }