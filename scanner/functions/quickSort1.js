function quickSort1(arr,start,end){
  if(start<end){
    let index = quick1(arr,start,end) //标志位的值
    quickSort1(arr,start,index-1)
    quickSort1(arr,index,end)
  }
  return arr
}