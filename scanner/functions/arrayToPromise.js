function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}