function resetCallbackAPIAudioBuffer(APISampleRate, bufferAlloc) {
  audioContextSampleBuffer = getFloat32(webAudioMaxBufferSize);
  audioBufferSize = webAudioMaxBufferSize;
  resampleBufferStart = 0;
  resampleBufferEnd = 0;
  resampleBufferSize = Math.max(webAudioMaxBufferSize * Math.ceil(XAudioJSSampleRate / APISampleRate), samplesPerCallback) << 1;
  if (webAudioMono) {
    //MONO Handling:
    resampled = getFloat32Flat(resampleBufferSize);
    resampleControl = new Resampler(XAudioJSSampleRate, APISampleRate, 1, resampleBufferSize, true);
    outputConvert = generateFlashMonoString;
  }
  else {
    //STEREO Handling:
    resampleBufferSize  <<= 1;
    resampled = getFloat32Flat(resampleBufferSize);
    resampleControl = new Resampler(XAudioJSSampleRate, APISampleRate, 2, resampleBufferSize, true);
    outputConvert = generateFlashStereoString;
  }
}