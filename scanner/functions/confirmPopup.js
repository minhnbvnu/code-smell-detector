async function confirmPopup(client) {
  const popup = await findPopup(client);
  const confirmButton = await popup.$('button.Button--primary');
  return confirmButton.click();
}