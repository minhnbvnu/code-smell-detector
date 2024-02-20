function makeTransform(value) {
  let scale = value / 100;
  let translateX = (value - 100) / 2;
  return `translateX(${translateX.toString()}%) scale(${scale.toString()}, 1)`;
}