function testExtBufferArray(type) {
    function content(j) {
        var x = j * type;
        return Buffer([x & 0x7F, (x + 1) & 0x7F]);
    }
    // fixarray len 10
    var arrayHeader = new Buffer([0x9a]);
    var fullBuffer = arrayHeader;
    for (var j = 0; j < 10; j++) {
      // fixext 2 -- 0xd5
      var header = new Buffer([0xd5, type]);
      fullBuffer = Buffer.concat([fullBuffer, header, content(j)]);
    }
    var decoded = msgpack.decode(fullBuffer);
    assert.equal(true, decoded instanceof Array);
    assert.equal(decoded.length, 10);
    for (j = 0; j < 10; j++) {
      assert.equal(decoded[j].type, type);
      assert.equal(decoded[j].buffer.length, 2);
      assert.deepEqual(decoded[j].buffer, content(j));
    }
    var encoded = msgpack.encode(decoded);
    assert.deepEqual(encoded, fullBuffer);
  }