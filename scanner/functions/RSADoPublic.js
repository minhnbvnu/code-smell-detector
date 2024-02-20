function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}