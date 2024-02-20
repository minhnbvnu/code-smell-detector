function startsWithTodoMarkdown(token) {
    // leading whitespace in a list item is already trimmed off by markdown-it
    return (
      token.content.indexOf('[ ] ') === 0 ||
      token.content.indexOf('[x] ') === 0 ||
      token.content.indexOf('[X] ') === 0
    );
  }