function rand(max) {
  last = (last * A + C) % M;
  return max * last / M;
}