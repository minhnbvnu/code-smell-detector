function expectNodeOffset(result, textContent, nodeOffset) {
  expect(result.node.textContent).toBe(textContent);
  expect(result.offset).toBe(nodeOffset);
}