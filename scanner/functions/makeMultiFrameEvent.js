function makeMultiFrameEvent(inFrame, outFrame, f) {
  for (let i = inFrame; i < outFrame; i += 1) {
    const e = new EventStruct(f);
    filmEventList[i] = e;
  }
}