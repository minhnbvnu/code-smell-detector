function testGo(state, tAdditional, options) {
  $state.go(state, options && options.params, options);
  $q.flush();
  var expectRedirect = options && options.redirect;
  if (!expectRedirect)
    expect($state.current.name).toBe(state);
  else
    expect($state.current.name).toBe(expectRedirect);

  var root = $state.$current.path[0].parent;
  var __inactives = root.parent;

  // If ct.ui.router.extras.sticky module is included, then root.parent holds the inactive states/views
  if (__inactives) {
    var __inactiveViews = _.keys(__inactives.locals);
    var extra = _.difference(__inactiveViews, tLog.views);
    var missing = _.difference(tLog.views, __inactiveViews);

    expect("Extra Views: " + extra).toEqual("Extra Views: " + []);
    expect("Missing Views: " + missing).toEqual("Missing Views: " + []);
  }

  if (tExpected && tAdditional) {
    // append all arrays in tAdditional to arrays in tExpected
    angular.forEach(tAdditional, function (value, key) {
      tExpected[key] = tExpected[key].concat(tAdditional[key]);
    });

    angular.forEach(_.without(_.keys(tLog), 'views'), function(key) {
      var left = key + ": " + angular.toJson(tLog[key]);
      var right = key + ": " + angular.toJson(tExpected[key]);
      expect(left).toBe(right);
    });
  }
}