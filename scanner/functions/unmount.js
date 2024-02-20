async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}