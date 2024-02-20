function indexGB18030PointerFor(code_point) {
    var /** @type {number} */ offset = 0,
        /** @type {number} */ pointer_offset = 0,
        /** @type {Array.<Array.<number>>} */ idx = index('gb18030');
    var i;
    for (i = 0; i < idx.length; ++i) {
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }
    return pointer_offset + code_point - offset;
  }