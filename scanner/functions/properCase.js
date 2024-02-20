function properCase(str = "") {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    let value = i === 0 ? str[i].toUpperCase() : str[i];
    newStr += value;
  }
  return newStr;
}