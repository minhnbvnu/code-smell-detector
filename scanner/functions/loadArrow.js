async function loadArrow() {
  return await import(`${cdn}${arrow.resolve()}`);
}