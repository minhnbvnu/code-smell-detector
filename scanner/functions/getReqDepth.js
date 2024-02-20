function getReqDepth(inputDepth) {
  return inputDepth && /^\d+$/.test(inputDepth) ? Number(inputDepth) : -1;
}