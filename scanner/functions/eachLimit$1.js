function eachLimit$1(coll, limit, iteratee, callback) {
  _eachOfLimit(limit)(coll, _withoutIndex(iteratee), callback);
}