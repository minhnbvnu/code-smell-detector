function asyncTrigger() {
  var _checks = [];

  return {
    push: function(fn) {
      _checks.push(fn);
    },

    check: function() {
      for (var check = 0; check < _checks.length; ++check) {
        _checks[check]();
      }

      _checks.splice(0, _checks.length);
    }
  };
}