function dragNode(client, nodeType, dx, dy) {
  return client
    .moveToObject(`.Node[data-label="${nodeType}"]`)
    .buttonDown()
    .moveTo(null, dx, dy)
    .buttonUp()
    .then(() => findNode(client, nodeType)); // for easy chaining
}