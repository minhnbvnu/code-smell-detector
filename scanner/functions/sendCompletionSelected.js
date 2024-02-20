function sendCompletionSelected(lang, completion) {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  const path = metricsCompletionSelectedPath();

  return promisifiedKiteAPIRequest(
    {
      path,
      method: "POST"
    },
    JSON.stringify({
      editor: 'vscode',
      language: lang,
      completion: completion
    })
  );
}