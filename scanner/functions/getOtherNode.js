function getOtherNode(left, right) {
  return fu.filter(function (node) {
    return !isNaNIdentifier(node)
  }, [left, right])
}