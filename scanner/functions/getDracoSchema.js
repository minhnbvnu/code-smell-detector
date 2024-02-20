function getDracoSchema(attributes, loaderData, indices) {
    const metadataMap = makeMetadata(loaderData.metadata);
    const fields = [];
    const namedLoaderDataAttributes = transformAttributesLoaderData(loaderData.attributes);
    for (const attributeName in attributes) {
      const attribute = attributes[attributeName];
      const field = getArrowFieldFromAttribute(attributeName, attribute, namedLoaderDataAttributes[attributeName]);
      fields.push(field);
    }
    if (indices) {
      const indicesField = getArrowFieldFromAttribute("indices", indices);
      fields.push(indicesField);
    }
    return new Schema(fields, metadataMap);
  }