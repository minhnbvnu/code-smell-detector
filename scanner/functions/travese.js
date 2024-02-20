function travese(node){
    if(node===null){
      return 
    }
    travese(node.left)
    arr.push(node)
    travese(node.right)
  }