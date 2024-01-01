function highComplexityFunction(x, y, z) {
  let result = 0;

  if (x > 0) result += x;
  else result -= x;

  if (y > 0) result += y;
  else result -= y;

  if (z > 0) result += z;
  else result -= z;

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            if (k % 2 === 0) result += i * j * k;
            else result -= i * j * k;
          } else {
            if (k % 2 === 0) result *= i * j * k;
            else result /= i * j * k;
          }
        } else {
          if (j % 2 === 0) {
            if (k % 2 === 0) result += i + j + k;
            else result -= i + j + k;
          } else {
            if (k % 2 === 0) result *= i + j + k;
            else result /= i + j + k;
          }
        }
      }
    }
  }

  return result;
}

// Example usage
const result = highComplexityFunction(5, 7, 9);
console.log(result);
