function findClassAttr(bodyTag) {
  // get the body tag's class attribute
  try{
    return bodyTag.match(/ class=["|'](.*?)["|']/gi)[0];
  }catch(e){}
}