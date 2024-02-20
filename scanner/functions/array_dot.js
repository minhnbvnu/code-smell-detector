function array_dot(a, b) {
    var sum = 0
    for(var i = 0; i < a.length; i++) sum += a[i] * b[i]
    return sum
  }