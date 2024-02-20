function generateResume(str){
  // '---[1:2][1:1:1]---'
  let ret = []
  // console.l
  let i = 0
  console.log(str.length)
  while(i<str.length){
    const s = str[i]
    if(s==='-'){
      ret.push(s)
      i++
    }else if(s==='['){
      const tmp = str.slice(i,str.indexOf(']',i))
      ret.push(tmp.slice(1).split(':'))
      i += tmp.length+1
    }
  }
  //generate html
  generateHtml(ret)
}