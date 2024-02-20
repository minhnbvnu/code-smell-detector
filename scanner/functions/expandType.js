function expandType(obj) {
    if (obj.hasOwnProperty('type')) { //ignore obj.prototype.type
      var type
        , i;
      if (typeof obj.type === 'object') {
        type = obj.type;
      }
      else if (typeof obj.type === 'string') {
        type = Handsontable.cellTypes[obj.type];
        if (type === void 0) {
          throw new Error('You declared cell type "' + obj.type + '" as a string that is not mapped to a known object. Cell type must be an object or a string mapped to an object in Handsontable.cellTypes');
        }
      }
      for (i in type) {
        if (type.hasOwnProperty(i) && !obj.hasOwnProperty(i)) {
          obj[i] = type[i];
        }
      }
    }
  }