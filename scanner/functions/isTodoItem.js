function isTodoItem(tokens, index) {
    return (
      isInline(tokens[index]) &&
      isParagraph(tokens[index - 1]) &&
      isListItem(tokens[index - 2]) &&
      startsWithTodoMarkdown(tokens[index])
    );
  }