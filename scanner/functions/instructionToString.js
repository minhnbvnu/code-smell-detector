function instructionToString(n) {
  for (let key in INSTR) {
    let value = INSTR[key];
    if (value === n) return key;
  };
  console.warn(`Unexpected instruction value ${n}`);
  return "";
}