function getNum(n){
  let sum = 0
  while(n){
    sum+= (n%10) ** 2
    n = Math.floor(n/10)
  }
  return sum
}