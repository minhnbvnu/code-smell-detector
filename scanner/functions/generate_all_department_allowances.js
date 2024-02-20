function generate_all_department_allowances() {

  var allowance_options = [{ value : 0, caption : 'None'}],
    allowance = 0.5;

  while (allowance <= 50) {
    allowance_options.push({ value : allowance, caption : allowance });
    allowance += 0.5;
  }

  return allowance_options;
}