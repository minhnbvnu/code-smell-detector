function Evaluate(payload) {
  opNumber = 0; // This keeps track of the progress of the evaluation
  GUIState = payload.GUIState;
  try {
    eval(payload.code);
  } catch (e) {
    setTimeout(() => {
      e.message = "Line " + currentLineNumber + ": "  + currentOp + "() encountered  " + e.message;
      throw e;
    }, 0);
  } finally {
    postMessage({ type: "resetWorking" });
    // Clean Cache; remove unused Objects
    for (let hash in argCache) {
      if (!usedHashes.hasOwnProperty(hash)) { delete argCache[hash]; } }
    usedHashes = {};
  }
}