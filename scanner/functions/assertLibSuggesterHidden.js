async function assertLibSuggesterHidden(client) {
  const libSuggester = await findLibSuggester(client);
  return assert.eventually.isFalse(libSuggester.isExisting());
}