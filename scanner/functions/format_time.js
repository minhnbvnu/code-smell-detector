function format_time(seconds) {
  if (isNaN(seconds)) seconds = 0;
  return zero_pad(parseInt(seconds/60)) + ":" + zero_pad(parseInt(seconds%60));
}