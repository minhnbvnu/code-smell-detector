function hasBoth(val) {
  return /[a-z][0-9]|[0-9][a-z]/i.test(val);
}