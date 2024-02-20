function strCryptSync(str) {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
}