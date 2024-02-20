function intValue(o) {
  if(o.s < 0) {
    if(o.t == 1) return o[0]-DV;
    else if(o.t == 0) return -1;
  }
  else if(o.t == 1) return o[0];
  else if(o.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((o[1]&((1<<(32-DB))-1))<<DB)|o[0];
}