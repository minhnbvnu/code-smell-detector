function addCurlyIfStmt(node) {
  var code_paths = [
    ['consequent', node.consequent],
    ['alternate', node.alternate]
  ]

  var uncurlied = fu.filter(function (x) {
      return x[1] != null &&
          !(x[0] == 'alternate' && x[1].type == 'IfStatement') &&
          x[1].type != 'BlockStatement'
  }, code_paths)

  return uncurlied.length === 0
    ? node
    : merge(node, fu.intoObject(fu.map(function (x) {
        return [x[0], wrapInCurlies(x[1])]
      }, uncurlied)))
}