function chainsFor(obj) {
  var m = metaFor(obj), ret = m.chains;
  if (!ret) {
    ret = m.chains = new ChainNode(null, null, obj);
  } else if (ret.value() !== obj) {
    ret = m.chains = ret.copy(obj);
  }
  return ret;
}