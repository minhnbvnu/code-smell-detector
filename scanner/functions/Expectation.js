function Expectation(options) {
    this.util = options.util || { buildFailureMessage: function() {} };
    this.customEqualityTesters = options.customEqualityTesters || [];
    this.actual = options.actual;
    this.addExpectationResult = options.addExpectationResult || function(){};
    this.isNot = options.isNot;

    var customMatchers = options.customMatchers || {};
    for (var matcherName in customMatchers) {
      this[matcherName] = Expectation.prototype.wrapCompare(matcherName, customMatchers[matcherName]);
    }
  }