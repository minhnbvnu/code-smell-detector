function LoadingBar(props) {
    var _this;

    _classCallCheck(this, LoadingBar);

    _this = _super.call(this, props);

    _this.reset = function () {
      _this.terminatingAnimationTimeoutId = null;

      _this.setState(initialState);
    };

    _this.newPercent = function (percent, progressIncrease) {
      // Use cosine as a smoothing function
      // It could be any function to slow down progress near the ending 100%
      var smoothedProgressIncrease = progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));
      return percent + smoothedProgressIncrease;
    };

    _this.simulateProgress = function () {
      _this.setState(function (prevState, _ref) {
        var maxProgress = _ref.maxProgress,
            progressIncrease = _ref.progressIncrease;
        var percent = prevState.percent;

        var newPercent = _this.newPercent(percent, progressIncrease);

        if (newPercent <= maxProgress) {
          percent = newPercent;
        }

        return {
          percent: percent
        };
      });
    };

    _this.state = _objectSpread({}, initialState);
    return _this;
  }