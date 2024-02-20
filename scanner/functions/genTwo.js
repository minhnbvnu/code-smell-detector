function* genTwo(x){
  yield* gen(1)
  yield* genOne(1)
  const y = `这是第 二个 yield 执行:${yield x + 2}`;
  return y;
 }