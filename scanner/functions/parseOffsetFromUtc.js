function parseOffsetFromUtc(name) {
  const match = name.match(/([+-]?)(\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }
  const sign = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3]);
  return sign * (60 * hours + minutes);
}