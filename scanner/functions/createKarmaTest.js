function createKarmaTest (context, template, opts) {
  const el = document.createElement('div')
  document.getElementById('tests').appendChild(el)
  const render = typeof template === 'string'
    ? { template: `<div>${template}</div>` }
    : { render: template }
  return new Vue({
    el,
    name: 'Test',
    ...render,
    ...opts
  })
}