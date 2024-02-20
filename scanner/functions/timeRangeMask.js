function timeRangeMask(value) {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length > 4) {
    return [...timeMask(numbers.substring(0, 4)), '-', ...timeMask(numbers.substring(4))];
  }
  return [...timeMask(numbers)];
}