function testExtBuffer(type) {
    // fixext 8 -- 0xd7
    var header = new Buffer([0xd7, type]);
    var content = new Buffer(8);
    for (var i = 0; i < 8; i++) {
      content[i] = (type + i) & 0x7F;
    }
    var source = Buffer.concat([header, content]);
    var decoded = msgpack.decode(source);
    assert.equal(decoded.type, type);
    assert.equal(decoded.buffer.length, content.length);
    assert.deepEqual(toArray(decoded.buffer), toArray(content));
    var encoded = msgpack.encode(decoded);
    assert.deepEqual(toArray(encoded), toArray(source));
  }