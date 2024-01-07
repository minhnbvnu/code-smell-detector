function valid( start, end ){
  if( start == null || end == null ){
    return false;
  }

  if( is.number( start ) && is.number( end ) ){
    return true;
  } else if( (start) && (end) ){
    return true;
  }

  return false;
}