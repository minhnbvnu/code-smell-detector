async function assertLibsNotFound(client) {
  const libSuggester = await findLibSuggester(client);
  const errorMessage = await libSuggester.$('.error');
  return assert.eventually.isTrue(
    errorMessage.waitForExist({ timeout: 30000 })
  );
}