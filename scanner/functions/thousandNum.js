function thousandNum(num = 0) {
  const str = (+num).toString().split(".");
  const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);
}