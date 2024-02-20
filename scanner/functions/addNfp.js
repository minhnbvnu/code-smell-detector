function addNfp() {
  return (
    parseFloat(arguments[0]) > 0) ?
    '+'+arguments[0].toString() :
    arguments[0].toString();
}