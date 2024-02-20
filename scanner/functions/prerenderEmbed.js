function prerenderEmbed({compiler, raw = '', fetch}, done) {
  let hit = cached[raw]
  if (hit) {
    const copy = hit.slice()
    copy.links = hit.links
    return done(copy)
  }

  const compile = compiler._marked
  let tokens = compile.lexer(raw)
  const embedTokens = []
  const linkRE = compile.InlineLexer.rules.link
  const links = tokens.links

  tokens.forEach((token, index) => {
    if (token.type === 'paragraph') {
      token.text = token.text.replace(
        new RegExp(linkRE.source, 'g'),
        (src, filename, href, title) => {
          const embed = compiler.compileEmbed(href, title)

          if (embed) {
            embedTokens.push({
              index,
              embed
            })
          }

          return src
        }
      )
    }
  })

  let moveIndex = 0
  walkFetchEmbed({compile, embedTokens, fetch}, ({embedToken, token}) => {
    if (token) {
      const index = token.index + moveIndex

      merge(links, embedToken.links)

      tokens = tokens
        .slice(0, index)
        .concat(embedToken, tokens.slice(index + 1))
      moveIndex += embedToken.length - 1
    } else {
      cached[raw] = tokens.concat()
      tokens.links = cached[raw].links = links
      done(tokens)
    }
  })
}