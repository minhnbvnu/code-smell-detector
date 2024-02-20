function getComputedTranslate(obj) {
    var result = {
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0
    };
    var offsetX = 0, offsetY = 0;
    if (!window.getComputedStyle || !obj)
      return result;
    var style = window.getComputedStyle(obj), transform, origin;
    transform = style.webkitTransform || style.mozTransform;
    origin = style.webkitTransformOrigin || style.mozTransformOrigin;
    var par = origin.match(/(.*)px\s+(.*)px/);
    if (par.length > 1) {
      offsetX = par[1] - 0;
      offsetY = par[2] - 0;
    }
    if (transform == 'none')
      return result;
    var mat3d = transform.match(/^matrix3d\((.+)\)$/);
    var mat2d = transform.match(/^matrix\((.+)\)$/);
    if (mat3d) {
      var str = mat3d[1].split(', ');
      result = {
        translateX: str[12] - 0,
        translateY: str[13] - 0,
        translateZ: str[14] - 0,
        offsetX: offsetX - 0,
        offsetY: offsetY - 0,
        scaleX: str[0] - 0,
        scaleY: str[5] - 0,
        scaleZ: str[10] - 0
      };
    } else if (mat2d) {
      var str = mat2d[1].split(', ');
      result = {
        translateX: str[4] - 0,
        translateY: str[5] - 0,
        offsetX: offsetX - 0,
        offsetY: offsetY - 0,
        scaleX: str[0] - 0,
        scaleY: str[3] - 0
      };
    }
    return result;
  }