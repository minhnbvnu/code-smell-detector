function nVars(n) {
  while (vars[I.LENGTH] < n) vars.push(new Variable(vars[I.LENGTH]))
  return vars
}