function prepareAst(src){
  var tree = (typeof src === 'string') ? parse(src) : src
  return hoist(tree)
}