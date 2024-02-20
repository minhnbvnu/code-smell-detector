async function setPopupValue(client, value) {
  const popup = await findPopup(client);
  const input = await popup.$('input');
  return input.setValue(value);
}