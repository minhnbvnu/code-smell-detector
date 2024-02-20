function errorToDiagnostic(error) {
  const { line, column } = error.meta;
  const message = getMessageFromError(error);
  const pos = {
    line: (line || 0) - 1,
    character: column || 0,
  };
  const range = { start: pos, end: { ...pos, character: 512 } }; // The end character is just an arbitrary large number
  return Diagnostic.create(range, message, DiagnosticSeverity.Error);
}