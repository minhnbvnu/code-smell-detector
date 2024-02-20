function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}