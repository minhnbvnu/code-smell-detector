function solution(blocks) {
  let ret = [] // 每一个block[i]作为起点的时候，最大的距离
  
  for(let i=0;i<blocks.length;i++) {
    // i分界线，左右两个青蛙开始跳
    let j = k = i
    for(j=i;j>=0;j--){
      // 第一只青蛙从右向左跳
      if(j===0 || blocks[j] > blocks[j-1]) {
        break
      }
    }

    for(k=i;k<blocks.length-1;k++){
      // 第二只青蛙从右向左跳
      if(blocks[k] > blocks[k+1]) {
        break
      }
    }

    // console.log(j,k)
    ret.push(k-j+1)
  }
  return Math.max(...ret)
}