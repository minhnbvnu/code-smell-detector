function isExtendOn(expect, actual){
  let isExtendOn = false;
  if(!actual.extendOn) {
    return isExtendOn;
  }
  actual.extendOn.forEach(base => {
    if(isExtendOn) {
      return;
    }
    
    isExtendOn = isSameType(expect, base);
  });
  return isExtendOn;
}