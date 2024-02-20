function eachHandler(handlerInfos, callback) {
      for (var i=0, l=handlerInfos.length; i<l; i++) {
        callback(handlerInfos[i]);
      }
    }