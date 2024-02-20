function getTransportBpm() {
    if (Tone.Transport && Tone.Transport.bpm) {
      return Tone.Transport.bpm.value;
    } else {
      return 120;
    }
  }