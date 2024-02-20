function $xhrFactoryProvider() {
  this.$get = function() {
    return function createXhr() {
      return new window.XMLHttpRequest();
    };
  };
}