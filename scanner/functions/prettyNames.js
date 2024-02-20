function prettyNames(namesList) {
  const out = [];
  out.push(`"${namesList[0]}"`);
  for (let i = 1; i < namesList.length - 1; i++) {
    out.push(`, "${namesList[i]}"`);
  }
  if (namesList.length > 1) {
    out.push(` or "${namesList[namesList.length - 1]}"`);
  }
  return out.join('');
}