function quick1(arr,start,end){
  // 双指针
  let init = start
  let flag = arr[init]
  start++
  while(start<=end){
    while(arr[end]>flag){
      end--
    }
    while(arr[start]<flag){
      start++ 
    }
    if(start<end){
      [arr[start],arr[end]] = [arr[end],arr[start]]
      start++
      end--
    }
  }
  [arr[init],arr[start-1]] = [arr[start-1],arr[init]]
  return start
}