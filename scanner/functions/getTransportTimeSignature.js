function getTransportTimeSignature() {
    if (Tone.Transport && Tone.Transport.timeSignature) {
      return Tone.Transport.timeSignature;
    } else {
      return 4;
    }
  }