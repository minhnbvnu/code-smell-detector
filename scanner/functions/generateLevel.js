function generateLevel (list, model, callback, refObject) {
      return h(RegionSelect, {
        ref: refObject,
        list,
        blankText: lang.pleaseSelect,
        modelValue: model,
        'onUpdate:modelValue': val => callback(val)
      })
    }