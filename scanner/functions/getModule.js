function getModule( type, name, moduleType, moduleName ){
  return util.getMap( {
    map: modules,
    keys: [ type, name, moduleType, moduleName ]
  } );
}