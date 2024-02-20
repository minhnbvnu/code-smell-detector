function i2cRequest(board, bytes) {
  const active = i2cActive.get(board);

  if (!active) {
    throw new Error(
      "I2C is not enabled for this board. To enable, call the i2cConfig() method."
    );
  }

  // Do not tamper with I2C_CONFIG messages
  if (bytes[1] === I2C_REQUEST) {
    const address = bytes[2];

    // If no peripheral settings exist, make them.
    if (!active[address]) {
      active[address] = {
        stopTX: true,
      };
    }

    // READ (8) or CONTINUOUS_READ (16)
    // value & 0b00011000
    if (bytes[3] & I2C_READ_MASK) {
      // Invert logic to accomodate default = true,
      // which is actually stopTX = 0
      bytes[3] |= Number(!active[address].stopTX) << 6;
    }
  }

  writeToTransport(board, bytes);
}