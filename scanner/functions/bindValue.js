async function bindValue(client, nodeType, pinLabel, value) {
  const node = await findNode(client, nodeType);
  await node.click();

  const inspectorWidget = await findInspectorWidget(client, pinLabel);
  await inspectorWidget.setValue(value);
  return inspectorWidget.keys('Enter');
}