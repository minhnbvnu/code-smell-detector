function testDataFromLine(line) {
  const codePoints = line.split(/\s*[×÷]\s*/).map(c => parseInt(c, 16));
  const input = ucs2encode(codePoints);

  const expected = line.split(/\s*÷\s*/) .map(sequence => {
    const codePoints = sequence.split(/\s*×\s*/).map(c => parseInt(c, 16))
    return ucs2encode(codePoints)
  });

  return { input, expected };
}