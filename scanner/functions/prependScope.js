function prependScope(nodes, variables, functions){
  if (variables && variables.length){
    var declarations = []
    for (var i=0;i<variables.length;i++){
      declarations.push({
        type: 'VariableDeclarator',
        id: variables[i].id,
        init: null
      })
    }

    nodes.unshift({
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: declarations
    })

  }

  if (functions && functions.length){
    for (var i=0;i<functions.length;i++){
      nodes.unshift(functions[i])
    }
  }
}