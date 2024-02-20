function finalValue(value){
  if (value instanceof ReturnValue){
    return value.value
  }
  return value
}