function Storage() {
  let _data = {};
  this.clear = function () {
    return (_data = {});
  };
  this.getItem = function (id) {
    return _data.hasOwnProperty(id) ? _data[id] : undefined;
  };
  this.removeItem = function (id) {
    return delete _data[id];
  };
  this.setItem = function (id, val) {
    return (_data[id] = String(val));
  };
}