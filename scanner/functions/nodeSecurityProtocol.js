function nodeSecurityProtocol(cb) {
  nsp({package: path.resolve('package.json')}, cb);
}