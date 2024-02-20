function grepTotalRatio(string) {
  const [, ratio] = new RegExp(/You\ssaved\s.+\((\d{1,3})%\)/).exec(string);
  return parseInt(ratio, 10);
}