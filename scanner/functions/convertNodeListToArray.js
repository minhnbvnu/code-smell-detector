function convertNodeListToArray(nodeList) {
      var array = [];

      for (var i = 0, len = nodeList.length; i < len; i++){
        array[i] = nodeList[i]
      }

      return array;
    }