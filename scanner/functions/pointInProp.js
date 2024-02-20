function pointInProp(objNode, point) {
    for (var i = 0; i < objNode.properties.length; i++) {
      var curProp = objNode.properties[i];
      if (curProp.key && curProp.key.start <= point && curProp.key.end >= point) return curProp;
    }
  }