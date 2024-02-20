function linkMarkdown2Html(text) {
    // replace [link text](http://example.com) with ahref link
    return String(text).replace(/\[([^\]]*)\]\(([^(]*)\)/, '<a target="_blank" href="$2">$1</a>');
  }