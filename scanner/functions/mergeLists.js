function mergeLists(lists,start,end){
  if(start===end){
    return lists[start]
  }
  const mid = start + ((end-start)>>1)
  const leftList = mergeLists(lists,start,mid)
  const rightList = mergeLists(lists,mid+1,end)
  return merge(leftList,rightList)
}