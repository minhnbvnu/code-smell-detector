function makeR (g, k, p, q) {
  return g.toRed(BN.mont(p)).redPow(k).fromRed().mod(q)
}