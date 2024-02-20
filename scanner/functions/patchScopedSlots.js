function patchScopedSlots (instance) {
  if (!instance._u) return
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  const original = instance._u
  instance._u = slots => {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return () => {
    instance._u = original
  }
}