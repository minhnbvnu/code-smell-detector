function CompletionsSupport() {
  // Python has "FullCompletionsSupport" so filter from regular.
  const enabled = EnabledAndSupported()
                  .filter(ext => ext != ".py" && ext != ".pyw")
                  .join(',');
  if (enabled === "") {
    return [];
  }
  return [
    { pattern: `**/*{${enabled}}`, scheme: "file" },
    { pattern: `**/*{${enabled}}`, scheme: "untitled" }
  ];
}