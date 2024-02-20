function todoify(token, TokenConstructor) {
    token.children.unshift(makeCheckbox(token, TokenConstructor));
    token.children[1].content = token.children[1].content.slice(3);
    token.content = token.content.slice(3);
  }