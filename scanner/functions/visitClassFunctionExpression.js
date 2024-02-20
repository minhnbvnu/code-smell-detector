function visitClassFunctionExpression(traverse, node, path, state) {
  var methodNode = path[0];
  var isGetter = methodNode.kind === 'get';
  var isSetter = methodNode.kind === 'set';

  state = utils.updateState(state, {
    methodFuncNode: node
  });

  if (methodNode.key.name === 'constructor') {
    utils.append('function ' + state.className, state);
  } else {
    var methodAccessorComputed = false;
    var methodAccessor;
    var prototypeOrStatic = methodNode["static"] ? '' : '.prototype';
    var objectAccessor = state.className + prototypeOrStatic;

    if (methodNode.key.type === Syntax.Identifier) {
      // foo() {}
      methodAccessor = methodNode.key.name;
      if (_shouldMungeIdentifier(methodNode.key, state)) {
        methodAccessor = _getMungedName(methodAccessor, state);
      }
      if (isGetter || isSetter) {
        methodAccessor = JSON.stringify(methodAccessor);
      } else if (reservedWordsHelper.isReservedWord(methodAccessor)) {
        methodAccessorComputed = true;
        methodAccessor = JSON.stringify(methodAccessor);
      }
    } else if (methodNode.key.type === Syntax.Literal) {
      // 'foo bar'() {}  | get 'foo bar'() {} | set 'foo bar'() {}
      methodAccessor = JSON.stringify(methodNode.key.value);
      methodAccessorComputed = true;
    }

    if (isSetter || isGetter) {
      utils.append(
        'Object.defineProperty(' +
          objectAccessor + ',' +
          methodAccessor + ',' +
          '{configurable:true,' +
          methodNode.kind + ':function',
        state
      );
    } else {
      if (state.g.opts.es3) {
        if (methodAccessorComputed) {
          methodAccessor = '[' + methodAccessor + ']';
        } else {
          methodAccessor = '.' + methodAccessor;
        }
        utils.append(
          objectAccessor +
          methodAccessor + '=function' + (node.generator ? '*' : ''),
          state
        );
      } else {
        if (!methodAccessorComputed) {
          methodAccessor = JSON.stringify(methodAccessor);
        }
        utils.append(
          'Object.defineProperty(' +
            objectAccessor + ',' +
            methodAccessor + ',' +
            '{writable:true,configurable:true,' +
            'value:function' + (node.generator ? '*' : ''),
          state
        );
      }
    }
  }
  utils.move(methodNode.key.range[1], state);
  utils.append('(', state);

  var params = node.params;
  if (params.length > 0) {
    utils.catchupNewlines(params[0].range[0], state);
    for (var i = 0; i < params.length; i++) {
      utils.catchup(node.params[i].range[0], state);
      path.unshift(node);
      traverse(params[i], path, state);
      path.shift();
    }
  }

  var closingParenPosition = utils.getNextSyntacticCharOffset(')', state);
  utils.catchupWhiteSpace(closingParenPosition, state);

  var openingBracketPosition = utils.getNextSyntacticCharOffset('{', state);
  utils.catchup(openingBracketPosition + 1, state);

  if (!state.scopeIsStrict) {
    utils.append('"use ' + 'strict";', state);
    state = utils.updateState(state, {
      scopeIsStrict: true
    });
  }
  utils.move(node.body.range[0] + '{'.length, state);

  path.unshift(node);
  traverse(node.body, path, state);
  path.shift();
  utils.catchup(node.body.range[1], state);

  if (methodNode.key.name !== 'constructor') {
    if (isGetter || isSetter || !state.g.opts.es3) {
      utils.append('})', state);
    }
    utils.append(';', state);
  }
  return false;
}