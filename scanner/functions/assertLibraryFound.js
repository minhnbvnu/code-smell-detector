async function assertLibraryFound(client) {
  const libSuggester = await findLibSuggester(client);
  const foundLibrary = await libSuggester.$('.Suggester-item--library');
  return assert.eventually.isTrue(
    foundLibrary.waitForExist({ timeout: 30000 })
  );
}