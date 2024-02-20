function ownMixins(object) {
  // TODO: We need to expose an API for getting _just_ the own mixins directly
  let meta = emberMeta(object);
  let parentMeta = meta.parent;
  let mixins = new Set();

  // Filter out anonymous mixins that are directly in a `class.extend`
  let baseMixins =
    object.constructor &&
    object.constructor.PrototypeMixin &&
    object.constructor.PrototypeMixin.mixins;

  meta.forEachMixins((m) => {
    // Find mixins that:
    // - Are not in the parent classes
    // - Are not primitive (has mixins, doesn't have properties)
    // - Don't include any of the base mixins from a class extend
    if (
      (!parentMeta || !parentMeta.hasMixin(m)) &&
      !m.properties &&
      m.mixins &&
      (!baseMixins || !m.mixins.some((m) => baseMixins.includes(m)))
    ) {
      mixins.add(m);
    }
  });

  return mixins;
}