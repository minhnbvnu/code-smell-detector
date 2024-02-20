function triggerSpeech(words, lang, voice) {
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(words);
  utterance.lang = lang;
  allVoices = synth.getVoices();
  const voices = allVoices.filter(v => v.lang.includes(lang));

  if (typeof voice === "number") {
    utterance.voice = voices[voice % voices.length];
  } else if (typeof voice === "string") {
    utterance.voice = voices.find(voice2 => voice2.name === voice2);
  }

  speechSynthesis.speak(utterance);
}