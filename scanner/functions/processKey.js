function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$3("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}