function detectTimesEnv(blockSettings) {
  var nytFonts = detectTimesFonts();
  var nytProjectEnv = detectAiFolder() && (detectConfigYml() || detectBirdkitEnv());
  var nytEnv = nytFonts && nytProjectEnv;

  if (nytFonts && !nytProjectEnv) {
    if (confirm("You seem to be running ai2html outside of a NYT graphics project.\nContinue in non-NYT mode?", true)) {
      nytEnv = false;
    } else {
      error("Make sure your Illustrator file is inside the \u201Cai\u201D folder of a Preview or Birdkit project.");
    }
  }

  if (!nytFonts && nytProjectEnv) {
    if (confirm("Your system is missing the NYT fonts.\nContinue?", true)) {
      nytEnv = true;
    } else {
      error("Install the NYT Fonts and then re-run ai2html.");
    }
  }

  // detect incompatibility between text block settings and current context
  if (nytEnv && blockSettings && detectUnTimesianSettings(blockSettings)) {
    error('The settings block is incompatible with NYT Preview. Delete it and re-run ai2html.');
  }

  return nytEnv;
}