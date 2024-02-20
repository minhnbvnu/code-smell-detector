function convertMarkdownToHtml(filename, type, text, config) {
  if (type == 'pdf') text = addTocToContent(text, config)
  let md = {}

  try {
    try {
      const hljs = require("highlight.js");
      console.log("[pretty-md-pdf] Converting (convertMarkdownToHtml) ...")
      const breaks = config["breaks"]
      md = markdownIt({
        html: true,
        breaks,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              str = hljs.highlight(lang, str, true).value
            } catch (error) {
              str = md.utils.escapeHtml(str)

              showErrorMessage("markdown-it:highlight", error)
            }
          } else {
            str = md.utils.escapeHtml(str)
          }
          return "<pre class='hljs'><code><div>" + str + "</div></code></pre>"
        }
      })
    } catch (error) {
      showErrorMessage("require(\"markdown-it\")", error)
    }

    // convert the img src of the markdown
    let defaultRender = md.renderer.rules.image
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
      let token = tokens[idx]
      let href = token.attrs[token.attrIndex("src")][1]
      // console.log("original href: " + href)
      if (type === "html") {
        href = decodeURIComponent(href).replace(/("|")/g, "")
      } else {
        href = convertImgPath(href, filename)
      }
      // console.log("converted href: " + href)
      token.attrs[token.attrIndex("src")][1] = href
      // // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self)
    }

    if (type !== "html") {
      // convert the img src of the html
      md.renderer.rules.html_block = function (tokens, idx) {
        let html = tokens[idx].content
        let $ = require("cheerio").load(html)
        $("img").each(function () {
          let src = $(this).attr("src")
          let href = convertImgPath(src, filename)
          $(this).attr("src", href)
        })
        return $.html()
      }
    }

    md.use(markdownItCheckbox)
      .use(markdownItAnchor)
      .use(markdownItToc)
      .use(markdownItKatex)
      .use(markdownItPlantuml)

    return md.render(text)

  } catch (error) {
    showErrorMessage("convertMarkdownToHtml()", error)
  }
}