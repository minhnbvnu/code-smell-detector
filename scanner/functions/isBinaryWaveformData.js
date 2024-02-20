function isBinaryWaveformData(data) {
  var isCompatible = data && typeof data === "object" && "byteLength" in data;

  if (isCompatible) {
    var view = new DataView(data);
    var version = view.getInt32(0, true);

    if (version !== 1 && version !== 2) {
      throw new TypeError("WaveformData.create(): This waveform data version not supported");
    }
  }

  return isCompatible;
}