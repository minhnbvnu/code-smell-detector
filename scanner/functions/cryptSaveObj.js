function cryptSaveObj(value) {
  if (value) {
    //var strVal = (new Buffer(JSON.stringify(value), 'utf-8' )).toString('ascii')
    //return cryptSave(JSON.stringify(strVal));
    var strVal = _encStr(value, false)
    return cryptSave(JSON.stringify(strVal));
  } else {
    return value;
  }
}