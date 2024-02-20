function deduceMeshField(attributeName, attribute, optionalMetadata) {
    const type = getArrowTypeFromTypedArray(attribute.value);
    const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
    const field = new Field(attributeName, new FixedSizeList(attribute.size, new Field("value", type)), false, metadata);
    return field;
  }