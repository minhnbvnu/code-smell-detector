function charArrayEq(cArr1, cArr2) {
  if(cArr1 === cArr2) return true
  if(!cArr1 || !_.isArray(cArr1)) return Object.is(cArr1, cArr2)
  if(cArr1.length !== cArr2.length) return false
  for(let i = 0; i < cArr1.length; i++) {
    if(!charEq(cArr1[i], cArr2[i])) return false
  }
  return true
}