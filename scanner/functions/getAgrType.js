function getAgrType(agr) {
  return Object.prototype.toString.call(agr).split(/\s/)[1].slice(0, -1).toLowerCase();
}