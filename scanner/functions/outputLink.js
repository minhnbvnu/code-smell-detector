function outputLink(cap, link, raw, lexer) {
    var href = link.href;
    var title = link.title ? escape(link.title) : null;
    var text = cap[1].replace(/\\([\[\]])/g, '$1');

    if (cap[0].charAt(0) !== '!') {
      lexer.state.inLink = true;
      var token = {
        type: 'link',
        raw: raw,
        href: href,
        title: title,
        text: text,
        tokens: lexer.inlineTokens(text, [])
      };
      lexer.state.inLink = false;
      return token;
    }

    return {
      type: 'image',
      raw: raw,
      href: href,
      title: title,
      text: escape(text)
    };
  }