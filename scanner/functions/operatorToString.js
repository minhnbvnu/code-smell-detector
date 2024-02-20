function operatorToString(op) {
  for (let key in OP) {
    if (OP[key] === op) return key;
  };
  return "undefined";
}