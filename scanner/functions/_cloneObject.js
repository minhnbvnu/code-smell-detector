function _cloneObject(object) {
      if (object == null || typeof (object) != 'object' || typeof (object.nodeType) != 'undefined') {
        return object;
      }
      var temp = {};
      for (var key in object) {
        if (typeof (jQuery) != 'undefined' && object[key] instanceof jQuery) {
          temp[key] = object[key];
        } else {
          temp[key] = _cloneObject(object[key]);
        }
      }
      return temp;
  }