async function runFixer({ selector, fixer, rootSelector }) {
  try {
    run(selector, fixerMap[fixer], rootSelector);
  } catch (err) {
    console.error(`[kiss-webfix run]: ${err.message}`);
  }
}