function renderMain(html) {
  if (!html) {
    html = '<h1>404 - Not found</h1>'
  }

  this._renderTo('.markdown-section', html)
  // Render sidebar with the TOC
  !this.config.loadSidebar && this._renderSidebar()

  // Execute script
  if (
    this.config.executeScript !== false &&
    typeof window.Vue !== 'undefined' &&
    !executeScript()
  ) {
    setTimeout(_ => {
      const vueVM = window.__EXECUTE_RESULT__
      vueVM && vueVM.$destroy && vueVM.$destroy()
      window.__EXECUTE_RESULT__ = new window.Vue().$mount('#main')
    }, 0)
  } else {
    this.config.executeScript && executeScript()
  }
}