function inferRank(node) {
  /** @type {Heading['depth'] | undefined} */
  let rank

  if (node.type === 'heading') {
    rank = node.depth
  } else if (node.type === 'html') {
    const results = node.value.match(htmlRe)
    rank = results
      ? /** @type {Heading['depth']} */ (Number(results[1]))
      : undefined
  } else if (
    (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
    node.name
  ) {
    const results = node.name.match(jsxNameRe)
    rank = results
      ? /** @type {Heading['depth']} */ (Number(results[1]))
      : undefined
  }

  return rank
}