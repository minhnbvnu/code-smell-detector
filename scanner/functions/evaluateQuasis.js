function evaluateQuasis(path, quasis, state, raw = false) {
  let str = "";
  let i = 0;
  const exprs = path.get("expressions");

  for (const elem of quasis) {
    if (!state.confident) break;
    str += raw ? elem.value.raw : elem.value.cooked;
    const expr = exprs[i++];
    if (expr) str += String(evaluateCached(expr, state));
  }

  if (!state.confident) return;
  return str;
}