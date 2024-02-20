function toPointer( path ) {
  if ( ! ( path && path.length && path.join ) ){
    return '';
  }
  return '/' + path.join('/');
}