function WaveformData(data) {
  if (isJsonWaveformData(data)) {
    data = convertJsonToBinary(data);
  }

  if (isBinaryWaveformData(data)) {
    this._data = new DataView(data);
    this._offset = this._version() === 2 ? 24 : 20;

    this._channels = [];

    for (var channel = 0; channel < this.channels; channel++) {
      this._channels[channel] = new WaveformDataChannel(this, channel);
    }
  }
  else {
    throw new TypeError(
      "WaveformData.create(): Unknown data format"
    );
  }
}