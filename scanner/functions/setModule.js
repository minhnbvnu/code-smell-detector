function setModule( type, name, moduleType, moduleName, registrant ){
  return util.setMap( {
    map: modules,
    keys: [ type, name, moduleType, moduleName ],
    value: registrant
  } );
}