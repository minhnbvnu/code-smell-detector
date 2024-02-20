function bubbleSort(arr){
  // 每个人和右边人比较，如果你比他高，就交换位置，否则就不动
  let len = arr.length-1
//  O(n^2)
  for(let j=0;j<len;j++){
    for(let i=0;i<len-j;i++){
      if(arr[i]>arr[i+1]){
        // let tmp = arr[i]
        // arr[i] = arr[i+1]
        // arr[i+1] = tmp
        [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
      }
    }
  }
  return arr
}