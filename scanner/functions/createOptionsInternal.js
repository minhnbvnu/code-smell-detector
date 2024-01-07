function createOptionsInternal(options) {
  /**
   * @type {HTMLElement|Document}
   */
  let keyboardEventTarget = null;
  if (options.keyboardEventTarget !== undefined) {
    keyboardEventTarget =
      typeof options.keyboardEventTarget === 'string'
        ? document.getElementById(options.keyboardEventTarget)
        : options.keyboardEventTarget;
  }

  /**
   * @type {Object<string, *>}
   */
  const values = {};

  const layerGroup =
    options.layers &&
    typeof (/** @type {?} */ (options.layers).getLayers) === 'function'
      ? /** @type {LayerGroup} */ (options.layers)
      : new LayerGroup({
          layers:
            /** @type {Collection<import("./layer/Base.js").default>|Array<import("./layer/Base.js").default>} */ (
              options.layers
            ),
        });
  values[MapProperty.LAYERGROUP] = layerGroup;

  values[MapProperty.TARGET] = options.target;

  values[MapProperty.VIEW] =
    options.view instanceof View ? options.view : new View();

  /** @type {Collection<import("./control/Control.js").default>} */
  let controls;
  if (options.controls !== undefined) {
    if (Array.isArray(options.controls)) {
      controls = new Collection(options.controls.slice());
    } else {
      assert(
        typeof (/** @type {?} */ (options.controls).getArray) === 'function',
        'Expected `controls` to be an array or an `ol/Collection.js`',
      );
      controls = options.controls;
    }
  }

  /** @type {Collection<import("./interaction/Interaction").default>} */
  let interactions;
  if (options.interactions !== undefined) {
    if (Array.isArray(options.interactions)) {
      interactions = new Collection(options.interactions.slice());
    } else {
      assert(
        typeof (/** @type {?} */ (options.interactions).getArray) ===
          'function',
        'Expected `interactions` to be an array or an `ol/Collection.js`',
      );
      interactions = options.interactions;
    }
  }

  /** @type {Collection<import("./Overlay.js").default>} */
  let overlays;
  if (options.overlays !== undefined) {
    if (Array.isArray(options.overlays)) {
      overlays = new Collection(options.overlays.slice());
    } else {
      assert(
        typeof (/** @type {?} */ (options.overlays).getArray) === 'function',
        'Expected `overlays` to be an array or an `ol/Collection.js`',
      );
      overlays = options.overlays;
    }
  } else {
    overlays = new Collection();
  }

  return {
    controls: controls,
    interactions: interactions,
    keyboardEventTarget: keyboardEventTarget,
    overlays: overlays,
    values: values,
  };
}