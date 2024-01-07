constructor(data) {
      this.buffer = data;
      this.pos = 0;
      this.end = data.length;
      this.tmpBuf = new Uint8Array(MAX_ENCODED_NUM_SIZE);
    }