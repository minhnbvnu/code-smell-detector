function TypeInitialiser(schema, tapeItem) {
  if (tapeItem.typecode)
    return TypeInitialisers[schema][tapeItem.typecode](tapeItem.value);
  else
    return tapeItem.value;
}