function cachePrototypeStyleFunction( key, fn ){
  key = util.hashString( key );

  let selfFn = ele => fn.call( ele );

  return function cachedPrototypeStyleFunction(){
    var ele = this[0];

    if( ele ){
      return styleCache( key, selfFn, ele );
    }
  };
}