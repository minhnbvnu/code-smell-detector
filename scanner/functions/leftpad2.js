function leftpad2(str,length,ch){
  let len = length-str.length
  total = ''
  while(true){
    // if(len%2==1){
    if(len & 1){
      total+=ch
    }
    if(len==1){
      return total+str
    }
    ch += ch
    len = len >> 1
    // len = parseInt(len/2)
  }

}