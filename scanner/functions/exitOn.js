function exitOn(signame) {
  process.once(signame, handler.bind(null, signame));
}