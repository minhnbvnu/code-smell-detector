function sortArr(arr){
  return arr.sort((a,b)=>{
    const [a1,b1] = [a,b].map(v=>Number(v.slice(1)))
    if(a1==b1){
      return a[0].charCodeAt()-b[0].charCodeAt()
    }else{
      return a1 -b1
    }
  })
}