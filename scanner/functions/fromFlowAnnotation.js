function fromFlowAnnotation(/*object*/ annotation, state) /*?object*/ {
  var ast;
  switch (annotation.type) {
    case 'NumberTypeAnnotation':
      return createAst(SYMBOLS.SIMPLE, 'number', 0);
    case 'StringTypeAnnotation':
      return createAst(SYMBOLS.SIMPLE, 'string', 0);
    case 'BooleanTypeAnnotation':
      return createAst(SYMBOLS.SIMPLE, 'boolean', 0);
    case 'AnyTypeAnnotation': // fallthrough
    case 'VoidTypeAnnotation':
      return null;
    case 'NullableTypeAnnotation':
      ast = fromFlowAnnotation(annotation.typeAnnotation, state);
      if (ast) {
        ast.nullable = true;
      }
      return ast;
    case 'ObjectTypeAnnotation':
    // ObjectTypeAnnotation is always converted to a simple object type, as we
    // don't support records
      return createAst(SYMBOLS.SIMPLE, 'object', 0);
    case 'FunctionTypeAnnotation':
      var params = annotation.params
        .map(function(param) {
          return fromFlowAnnotation(param.typeAnnotation, state);
        })
        .filter(function(ast) {
          return !!ast;
        });

      var returnType = fromFlowAnnotation(annotation.returnType, state);

      // If any of the params have a type that cannot be expressed, then we have
      // to render a simple function instead of a detailed one
      if ((params.length || returnType)
           && params.length === annotation.params.length) {
        return createAst(SYMBOLS.FUNCTION, [params, returnType], 0);
      }
      return createAst(SYMBOLS.SIMPLE, 'function', 0);
    case 'GenericTypeAnnotation':
      var alias = getTypeAlias(annotation.id, state);
      if (alias) {
        return fromFlowAnnotation(alias, state);
      }

      // Qualified type identifiers are not handled by runtime typechecker,
      // so simply omit the annotation for now.
      if (annotation.id.type === 'QualifiedTypeIdentifier') {
        return null;
      }

      if (isTypeVariableInScope(annotation.id, state)) {
        return null;
      }

      var name = annotation.id.name;
      var nameLowerCased = name.toLowerCase();
      if (name !== 'Object' && BLACKLISTED.hasOwnProperty(name)) {
        return null;
      }
      if (SIMPLETYPES.hasOwnProperty(nameLowerCased)) {
        name = nameLowerCased;
      }

      var id = createAst(
        SYMBOLS.SIMPLE,
        name,
        0
      );

      switch (name) {
        case 'mixed': // fallthrough
        case '$Enum':
          // Not supported
          return null;
        case 'array': // fallthrough
        case 'promise':
          if (annotation.typeParameters) {
            var parametricAst = fromFlowAnnotation(
              annotation.typeParameters.params[0],
              state
            );
            if (parametricAst) {
              return createAst(
                SYMBOLS.GENERIC,
                [id, parametricAst],
                0
              );
            }
          }
          break;
        case '$Either':
          if (annotation.typeParameters) {
            return createAst(
              SYMBOLS.UNION,
              annotation.typeParameters.params.map(
                function (node) { return fromFlowAnnotation(node, state); }
              ),
              0
            );
          }
          return null;
      }
      return id;
  }
  return null;
}