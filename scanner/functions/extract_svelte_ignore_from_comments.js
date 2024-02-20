function extract_svelte_ignore_from_comments(node2) {
    return flatten((node2.leadingComments || []).map((comment) => extract_svelte_ignore(comment.value)));
  }