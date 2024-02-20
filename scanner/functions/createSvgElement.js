function createSvgElement(tagName, data, parent, spinnerName) {
    var ele = document.createElement(SHORTCUTS[tagName] || tagName);
    var k, x, y;

    for (k in data) {

      if (angular.isArray(data[k])) {
        for (x = 0; x < data[k].length; x++) {
          if (data[k][x].fn) {
            for (y = 0; y < data[k][x].t; y++) {
              createSvgElement(k, data[k][x].fn(y, spinnerName), ele, spinnerName);
            }
          } else {
            createSvgElement(k, data[k][x], ele, spinnerName);
          }
        }

      } else {
        setSvgAttribute(ele, k, data[k]);
      }
    }

    parent.appendChild(ele);
  }