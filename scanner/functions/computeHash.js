function computeHash(input) {
  const hash = JSON.stringify(input)
    .split('')
    .reduce((prev, curr) => (prev << 5) - prev + curr.charCodeAt(0), 0);
  return (hash >>> 0).toString();
}