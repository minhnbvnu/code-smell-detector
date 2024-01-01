function getEntityCount () {
    var elements = _scene.querySelectorAll('*');
    Array.prototype.slice.call(elements).filter(function (el) {
      return el.isEntity;
    });
    return elements.length;
  }