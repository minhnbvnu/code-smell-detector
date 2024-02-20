async function assertNoPatchesAreOpen(client) {
  const el = await client.$('.NoPatch');
  return assert.eventually.isTrue(el.isDisplayed());
}