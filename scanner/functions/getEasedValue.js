function getEasedValue( type, start, end, percent, easingFn ){
  if( percent === 1 ){
    return end;
  }

  if( start === end ){
    return end;
  }

  let val = easingFn( start, end, percent );

  if( type == null ){
    return val;
  }

  if( type.roundValue || type.color ){
    val = Math.round( val );
  }

  if( type.min !== undefined ){
    val = Math.max( val, type.min );
  }

  if( type.max !== undefined ){
    val = Math.min( val, type.max );
  }

  return val;
}