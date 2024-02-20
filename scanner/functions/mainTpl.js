function mainTpl(config) {
  let html = `<nav class="app-nav${
    config.repo ? '' : ' no-badge'
  }"><!--navbar--></nav>`

  if (config.repo) {
    html += tpl.corner(config.repo)
  }
  if (config.coverpage) {
    html += tpl.cover()
  }

  html += tpl.main(config)

  return html
}