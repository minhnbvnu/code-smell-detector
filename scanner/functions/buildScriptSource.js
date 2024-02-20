function buildScriptSource(workerUrl) {
    return `try {
  importScripts('${workerUrl}');
} catch (error) {
  console.error(error);
  throw error;
}`;
  }