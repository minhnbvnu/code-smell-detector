function channelToArray(ch) {
    const out = [];

    for (let i = 0; i < ch.numberOfChannels; i++) {
      out[i] = ch.getChannelData(i);
    }

    return out;
  }