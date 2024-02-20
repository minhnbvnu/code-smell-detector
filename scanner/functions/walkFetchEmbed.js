function walkFetchEmbed({embedTokens, compile, fetch}, cb) {
  let token
  let step = 0
  let count = 1

  if (!embedTokens.length) {
    return cb({})
  }

  while ((token = embedTokens[step++])) {
    const next = (function (token) {
      return text => {
        let embedToken
        if (text) {
          if (token.embed.type === 'markdown') {
            embedToken = compile.lexer(text)
          } else if (token.embed.type === 'code') {
            embedToken = compile.lexer(
              '```' +
                token.embed.lang +
                '\n' +
                text.replace(/`/g, '@DOCSIFY_QM@') +
                '\n```\n'
            )
          } else if (token.embed.type === 'mermaid') {
            embedToken = [
              {type: 'html', text: `<div class="mermaid">\n${text}\n</div>`}
            ]
            embedToken.links = {}
          } else {
            embedToken = [{type: 'html', text}]
            embedToken.links = {}
          }
        }
        cb({token, embedToken})
        if (++count >= step) {
          cb({})
        }
      }
    })(token)

    if (token.embed.url) {
      if (process.env.SSR) {
        fetch(token.embed.url).then(next)
      } else {
        get(token.embed.url).then(next)
      }
    } else {
      next(token.embed.html)
    }
  }
}