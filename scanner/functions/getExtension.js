function getExtension( type, name ){
  return util.getMap( {
    map: extensions,
    keys: [ type, name ]
  } );
}