function translation(data) {
  this.localized = data;
  this.translate = function(key) {
    var item = this.localized;
    try {
      key.split('.').forEach(function(val) {
        item = item[val];
      });
      if(typeof(item) != 'string') {
        item = null;
      }
    }
    catch(e) {
      item = null;
    }
    return item || ("No translation for " + key);
  }
  this.t = function(key) { return this.translate(key); }
}