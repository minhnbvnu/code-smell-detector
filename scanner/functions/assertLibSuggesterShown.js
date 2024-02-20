async function assertLibSuggesterShown(client) {
  const libSuggester = await findLibSuggester(client);
  return assert.eventually.isTrue(libSuggester.isDisplayed());
}