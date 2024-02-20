function makeCheckbox(token, TokenConstructor) {
    const checkbox = new TokenConstructor('html_inline', '', 0);

    if (token.content.indexOf('[ ] ') === 0) {
      checkbox.content = renderCheckbox('todo');
    } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
      checkbox.content = renderCheckbox('completed');
    }

    return checkbox;
  }