function EDEState(type, key) {
  assert.equal(key.length, 24, 'Invalid key length');

  var k1 = key.slice(0, 8);
  var k2 = key.slice(8, 16);
  var k3 = key.slice(16, 24);

  if (type === 'encrypt') {
    this.ciphers = [
      DES.create({ type: 'encrypt', key: k1 }),
      DES.create({ type: 'decrypt', key: k2 }),
      DES.create({ type: 'encrypt', key: k3 })
    ];
  } else {
    this.ciphers = [
      DES.create({ type: 'decrypt', key: k3 }),
      DES.create({ type: 'encrypt', key: k2 }),
      DES.create({ type: 'decrypt', key: k1 })
    ];
  }
}