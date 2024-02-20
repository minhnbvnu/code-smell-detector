function rpad(str, len, chr) {
  if (!chr) chr = " ";
  while (str.length < len) str += chr;
  return str;
}