function assertArrayEq(a, b) {
  if(a.length !== b.length) {
    throw "length does not match";
  }
  if(a.every((v, i) => v === b[i])) {
    return true;
  } else {
    utils.log("a: " + a);
    utils.log("b: " + b);
    throw "mismatch";
  }
}