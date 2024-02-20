function escape_html(html2) {
    return String(html2).replace(regex_html_characters_to_escape, (match) => escaped[match]);
  }