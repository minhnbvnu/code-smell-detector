function backtrack(i){
    if(path.length>4){
      return
    }
    if(path.length===4 && i===s.length){
      ret.push(path.join('.'))
      return
    }
    // 判断终止条件
    for(let j=i;j<s.length;j++){
      // 要得符合ip的判断逻辑
      const str = s.substr(i,j-i+1)
      if(Number(str)>255){
        break
      }
      if(str.length>1 && str[0]==='0'){
        break
      }
      path.push(str)
      backtrack(j+1) //切下一个
      path.pop()
    }
  }