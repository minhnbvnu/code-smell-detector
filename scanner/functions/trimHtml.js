function trimHtml(html) {
  return html
        .replace(/\r?\n+/g, '')
        .replace(/<!--.*?-->/ig, '')
        .replace(/\/\*.*?\*\//ig, '')
        .replace(/[ ]+</ig, '<')
}