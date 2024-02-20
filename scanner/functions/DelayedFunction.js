function DelayedFunction(f, timeout) {

  var complete = false;

  var timeoutRef = setTimeout(function() {
    _invoke();
  }.bind(this), timeout);

  // private, see http://javascript.crockford.com/private.html
  function _invoke() {
    complete = true;
    f();
  }

  this.call = function() {
    if (!complete) {
      _invoke();
    }
  };

  this.cancel = function() {
    complete = true;
    clearTimeout(timeoutRef);
    tabOrderUpdateFunction = null; // have to set variable null so that it's evaluated as false
  };
}