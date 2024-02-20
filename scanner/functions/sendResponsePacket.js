function sendResponsePacket(response) {
      const sizeBuf = new Buffer(4);
      const dataBuf = new Buffer(response);
      sizeBuf.writeUInt32LE(dataBuf.length, 0);
      writable.write(sizeBuf);
      writable.write(dataBuf);
    }