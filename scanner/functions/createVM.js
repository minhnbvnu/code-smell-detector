function createVM (context, template, opts = {}) {
  // Remove transitions
  const transition = {
    functional: true,
    render: (h, { data, children }) => h('div', data, children)
  }

  Vue.component('transition', transition)
  Vue.component('transition-group', transition)

  return isKarma
    ? createKarmaTest(context, template, opts)
    : createVisualTest(context, template, opts)
}