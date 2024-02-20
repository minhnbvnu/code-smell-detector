async function waitForExist(client, selector, timeout) {
  const el = await client.$(selector);
  return el.waitForExist({ timeout });
}