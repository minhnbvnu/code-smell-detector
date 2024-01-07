function styleCache( key, fn, ele ){
  var _p = ele._private;
  var cache = _p.styleCache = _p.styleCache || [];
  var val;

  if( (val = cache[key]) != null ){
    return val;
  } else {
    val = cache[key] = fn( ele );

    return val;
  }
}