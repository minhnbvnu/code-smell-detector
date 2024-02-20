function createDirective(directiveOptions = {}) {
  const instanceMaskReplacers = extendMaskReplacers(
    directiveOptions && directiveOptions.placeholders,
  );

  /**
   * Vue directive definition
   */
  return {

    /**
     * Called only once, when the directive is first bound to the element.
     * This is where you can do one-time setup work.
     *
     * @param {(HTMLInputElement|HTMLElement)} el
     * @param {?string}                        value
     */
    bind(el, { value }) {
      el = queryInputElementInside(el);

      updateMask(el, value, instanceMaskReplacers);
      updateValue(el);
    },

    /**
     * Called after the containing component has updated,
     * but possibly before its children have updated.
     * The directive’s value may or may not have changed,
     * but you can skip unnecessary updates by comparing the
     * binding’s current and old values.
     *
     * @param {(HTMLInputElement|HTMLElement)} el
     * @param {?string}                        value
     * @param {?string}                        oldValue
     */
    componentUpdated(el, { value, oldValue }) {
      el = queryInputElementInside(el);

      const isMaskChanged = isFunction(value)
        || maskToString(oldValue) !== maskToString(value);

      if (isMaskChanged) {
        updateMask(el, value, instanceMaskReplacers);
      }

      updateValue(el, isMaskChanged);
    },

    unbind(el) {
      el = queryInputElementInside(el);
      options.remove(el);
    },
  };
}