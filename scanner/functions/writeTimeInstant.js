function writeTimeInstant(node, time) {
  const timeInstant = createElementNS(GMLNS, 'TimeInstant');
  node.appendChild(timeInstant);

  const timePosition = createElementNS(GMLNS, 'timePosition');
  timeInstant.appendChild(timePosition);
  writeStringTextNode(timePosition, time);
}