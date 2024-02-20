function addDecimals(str, decimals) {
  if (!/^\d*\.?\d*$/.test(str)) {
    throw new Error('Invalid number');
  }
  if (!str.includes('.')) {
    str += '.';
  }
  let [intStr, fractionStr] = str.split('.');
  if (fractionStr.length > decimals) {
    fractionStr = fractionStr.slice(0, decimals);
  } else {
    fractionStr += '0'.repeat(decimals - fractionStr.length);
  }
  return (intStr + fractionStr).replace(/^0+/, '') || '0';
}