function zero_pad(num) {
  zero = 2 - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}