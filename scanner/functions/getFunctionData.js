function getFunctionData(
  node,
  docNode,
  state,
  source,
  commentsForFile,
  linesForFile
) {
  var params = [];
  var typechecks = commentsForFile.typechecks;
  var typehintsFromBlock = null;
  if (typechecks) {
    // esprima has trouble with some params so ignore them (e.g. $__0)
    if (!node.params.some(function(param) { return !param.name; })) {
      try {
        typehintsFromBlock = genericTransform.getTypeHintsFromDocBlock(
          node,
          state.docBlocksByLine
        );
      } catch (e) {
      }
    }
  }
  node.params.forEach(function(param) {
    // TODO: Handle other things like Syntax.ObjectPattern
    if (param.type === Syntax.Identifier) {
      var typehint;
      if (param.typeAnnotation) {
        typehint = sanitizeTypehint(source.substring(
          param.typeAnnotation.range[0],
          param.typeAnnotation.range[1]
        ));
      } else if (typehintsFromBlock && typehintsFromBlock.params) {
        typehintsFromBlock.params.some(function(paramTypehint) {
          if (paramTypehint[0] === param.name) {
            typehint = paramTypehint[1];
            return true;
          }
        });
      }
      if (!typehint && typechecks) {
        try {
          typehint = genericTransform.getTypeHintFromInline(
            param,
            state.commentsByLine
          );
        } catch (e) {
        }
      }
      params.push({
        typehint: safeParseTypehint(typehint),
        name: param.name + (param.optional ? '?' : ''),
      });
    } else if (param.type === Syntax.TypeAnnotatedIdentifier) {
      params.push({
        typehint: sanitizeTypehint(source.substring(
          param.annotation.range[0],
          param.annotation.range[1]
        )),
        name: param.id.name
      });
    }
  });
  var returnTypehint = null;
  if (node.returnType) {
    returnTypehint = sanitizeTypehint(source.substring(
      node.returnType.range[0],
      node.returnType.range[1]
    ));
  } else if (typehintsFromBlock) {
    returnTypehint = typehintsFromBlock.returns;
  }
  var tparams = null;
  if (node.typeParameters) {
    tparams = node.typeParameters.params.map(function(x) {
      return x.name;
    });
  }
  return {
    line: docNode.loc.start.line,
    source: source.substring.apply(source, node.range),
    docblock: getDocBlock(docNode, commentsForFile, linesForFile),
    modifiers: [],
    params: params,
    tparams: tparams,
    returntypehint: safeParseTypehint(returnTypehint)
  };
}