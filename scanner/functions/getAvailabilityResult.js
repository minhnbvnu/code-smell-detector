function getAvailabilityResult(availabilityData, index) {
    if ("constant" in availabilityData) {
      return Boolean(availabilityData.constant);
    }
    if (availabilityData.explicitBitstream) {
      return getBooleanValueFromBitstream(index, availabilityData.explicitBitstream);
    }
    return false;
  }