function* genOne(x) {
  const y = `这是第一个 yield 执行:${yield x + 1}`;
  return y;
}