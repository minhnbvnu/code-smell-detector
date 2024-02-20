function stream2word(data, databytes){
  var i, temp = 0;
  for (i = 0; i < 4; i++, BLF_J++) {
    if (BLF_J >= databytes) BLF_J = 0;
    temp = (temp << 8) | data[BLF_J];
  }
  return temp;
}