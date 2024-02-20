function createVisualTest (context, template, opts) {
  let vm
  if (typeof template === 'string') {
    opts.components = opts.components || {}
    // Let the user define a test component
    if (!opts.components.Test) {
      opts.components.Test = Test
    }
    vm = new Vue({
      name: 'TestContainer',
      el: context.DOMElement,
      template: `<Test id="${context.DOMElement.id}">${template}</Test>`,
      ...opts
    })
  } else {
    // TODO allow redefinition of Test component
    vm = new Vue({
      name: 'TestContainer',
      el: context.DOMElement,
      render (h) {
        return h(Test, {
          attrs: {
            id: context.DOMElement.id
          }
          // render the passed component with this scope
        }, [template.call(this, h)])
      },
      ...opts
    })
  }

  context.DOMElement.vm = vm
  return vm
}