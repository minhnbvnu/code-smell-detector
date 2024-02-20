function preTravese(root,list){
  if(root!==null){
    list.push(root)
    preTravese(root.left,list)
    preTravese(root.right,list)
  }
}