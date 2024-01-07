function cacheStyleFunction( key, fn ){
  key = util.hashString( key );

  return function cachedStyleFunction( ele ){
    return styleCache( key, fn, ele );
  };
}