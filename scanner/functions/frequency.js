function frequency(seq, length){
 var m, i, t = {}, n = seq.length - length + 1

 for(i = 0; i < n; i++){
  m = seq.substr(i, length)
  t[m] = (t[m] || 0) + 1
 }

 t.n = n
 return t
}