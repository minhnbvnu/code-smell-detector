function getProcessorsForContext(audioContext) {
    return audioContext.$$processors || (audioContext.$$processors = {});
  }