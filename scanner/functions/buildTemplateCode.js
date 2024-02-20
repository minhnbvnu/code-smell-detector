function buildTemplateCode(tpl, prefix) {
  const names = [];
  let code = tpl[0];

  for (let i = 1; i < tpl.length; i++) {
    const value = `${prefix}${i - 1}`;
    names.push(value);
    code += value + tpl[i];
  }

  return {
    names,
    code
  };
}