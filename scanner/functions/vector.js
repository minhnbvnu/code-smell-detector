function vector(x, y) {
  var v
  if(Array.isArray(x)) v = {x: x[0], y: x[1]}
  else if (typeof x === 'number') v = {x: x, y: y}
  else if (typeof x === 'object') v = { x: x.x, y: x.y }
  else v = { x: 0, y: 0 }
  // All methods should return a new vector object.
  v.rot = function(theta) {
    if (arguments.length) {
      var x = v.x * cos(theta) - v.y * sin(theta)
      var y = v.x * sin(theta) + v.y * cos(theta)
      return vector(x, y)
    } else {
      var a = v.unit()
      // returns the angle theta in the range (-pi, pi)
      return acos(a.x) * ((a.y < 0) ? -1 : 1)
    }
  }
  v.matrixMulti = function(m) {
    return vector(
        m[0][0] * v.x + m[0][1] * v.y
      , m[1][0] * v.x + m[1][1] * v.y
    )
  }
  v.unit = function() { var l = v.len(); return vector(v.x / l, v.y / l) }
  v.len = function() { return sqrt( v.x * v.x + v.y * v.y ) }
  v.sub = function(b) { return vector(v.x - b.x, v.y - b.y) }
  v.add = function(b) { return vector(v.x + b.x, v.y + b.y) }
  v.scale = function(s) { return vector(v.x * s, v.y * s) }
  v.rotDegrees = function(theta) { return v.rot(theta * pi / 180) }
  v.array = function(array) {
    return array ? vector(array[0], array[1]) : [v.x, v.y]
  }
  v.to = function(func) { return func(v) }
  v.toString = function() { return v.array().toString() }
  v.cross = function(b) { return v.x * b.y - v.y * b.x }
  return v
}