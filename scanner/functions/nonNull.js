function nonNull(x) {
  if (x == null) {
    throw new Error(`Unexpected ${x} value.`);
  }

  return x;
}