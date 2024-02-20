function parseNumeral(numOrString) {
  const asNumber = Number(numOrString);

  if (!isNaN(asNumber)) {
    return asNumber;
  }

  if (isNote(numOrString)) {
    return toMidi(numOrString);
  }

  throw new Error(`cannot parse as numeral: "${numOrString}"`);
}