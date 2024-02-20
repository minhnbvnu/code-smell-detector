function MockLocomotive() {
  var self = this;
  this._routes = {};
  this._routes.find = function(controller, action) {
    var key = controller + '#' + action;
    return self._routes[key];
  }
  
  this._helpers = {};
  this._dynamicHelpers = {};
}