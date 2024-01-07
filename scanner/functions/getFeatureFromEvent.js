function getFeatureFromEvent(evt) {
  if (
    /** @type {import("../source/Vector.js").VectorSourceEvent} */ (evt).feature
  ) {
    return /** @type {import("../source/Vector.js").VectorSourceEvent} */ (evt)
      .feature;
  }
  if (
    /** @type {import("../Collection.js").CollectionEvent<import("../Feature.js").default>} */ (
      evt
    ).element
  ) {
    return /** @type {import("../Collection.js").CollectionEvent<import("../Feature.js").default>} */ (
      evt
    ).element;
  }
  return null;
}