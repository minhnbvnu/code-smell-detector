function dummyVoiceUnderscores(overrides) {
  const voice = dummyVoiceHyphens(overrides);
  voice.lang = voice.lang.replace('-', '_');
  return voice;
}