function leftpad(str,length,ch){
  let len = length-str.length+1
  return Array(len).join(ch)+str
}