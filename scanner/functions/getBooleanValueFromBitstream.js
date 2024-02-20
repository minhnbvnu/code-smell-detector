function getBooleanValueFromBitstream(availabilityIndex, availabilityBuffer) {
    const byteIndex = Math.floor(availabilityIndex / 8);
    const bitIndex = availabilityIndex % 8;
    const bitValue = availabilityBuffer[byteIndex] >> bitIndex & 1;
    return bitValue === 1;
  }