function evaluateAst(tree, context){

  var safeFunction = FunctionFactory(context)
  var primitives = Primitives(context)

  // block scoped context for catch (ex) and 'let'
  var blockContext = context

  return walk(tree)

  // recursively walk every node in an array
  function walkAll(nodes){
    var result = undefined
    for (var i=0;i<nodes.length;i++){
      var childNode = nodes[i]
      if (childNode.type === 'EmptyStatement') continue
      result = walk(childNode)
      if (result instanceof ReturnValue){
        return result
      }
    }
    return result
  }

  // recursively evalutate the node of an AST
  function walk(node){
    if (!node) return
    switch (node.type) {

      case 'Program':
        return walkAll(node.body)

      case 'BlockStatement':
        enterBlock()
        var result = walkAll(node.body)
        leaveBlock()
        return result

      case 'FunctionDeclaration':
        var params = node.params.map(getName)
        var value = getFunction(node.body, params, blockContext)
        return context[node.id.name] = value

      case 'FunctionExpression':
        var params = node.params.map(getName)
        return getFunction(node.body, params, blockContext)

      case 'ReturnStatement':
        var value = walk(node.argument)
        return new ReturnValue('return', value)

      case 'BreakStatement':
        return new ReturnValue('break')

      case 'ContinueStatement':
        return new ReturnValue('continue')

      case 'ExpressionStatement':
        return walk(node.expression)

      case 'AssignmentExpression':
        return setValue(blockContext, node.left, node.right, node.operator)

      case 'UpdateExpression':
        return setValue(blockContext, node.argument, null, node.operator)

      case 'VariableDeclaration':
        node.declarations.forEach(function(declaration){
          var target = node.kind === 'let' ? blockContext : context
          if (declaration.init){
            target[declaration.id.name] = walk(declaration.init)
          } else {
            target[declaration.id.name] = undefined
          }
        })
        break

      case 'SwitchStatement':
        var defaultHandler = null
        var matched = false
        var value = walk(node.discriminant)
        var result = undefined

        enterBlock()

        var i = 0
        while (result == null){
          if (i<node.cases.length){
            if (node.cases[i].test){ // check or fall through
              matched = matched || (walk(node.cases[i].test) === value)
            } else if (defaultHandler == null) {
              defaultHandler = i
            }
            if (matched){
              var r = walkAll(node.cases[i].consequent)
              if (r instanceof ReturnValue){ // break out
                if (r.type == 'break') break
                result = r
              }
            }
            i += 1 // continue
          } else if (!matched && defaultHandler != null){
            // go back and do the default handler
            i = defaultHandler
            matched = true
          } else {
            // nothing we can do
            break
          }
        }

        leaveBlock()
        return result

      case 'IfStatement':
        if (walk(node.test)){
          return walk(node.consequent)
        } else if (node.alternate) {
          return walk(node.alternate)
        }

      case 'ForStatement':
        var infinite = InfiniteChecker(maxIterations)
        var result = undefined

        enterBlock() // allow lets on delarations
        for (walk(node.init); walk(node.test); walk(node.update)){
          var r = walk(node.body)

          // handle early return, continue and break
          if (r instanceof ReturnValue){
            if (r.type == 'continue') continue
            if (r.type == 'break') break
            result = r
            break
          }

          infinite.check()
        }
        leaveBlock()
        return result

      case 'ForInStatement':
        var infinite = InfiniteChecker(maxIterations)
        var result = undefined

        var value = walk(node.right)
        var property = node.left

        var target = context
        enterBlock()

        if (property.type == 'VariableDeclaration'){
          walk(property)
          property = property.declarations[0].id
          if (property.kind === 'let'){
            target = blockContext
          }
        }

        for (var key in value){
          setValue(target, property, {type: 'Literal', value: key})
          var r = walk(node.body)

          // handle early return, continue and break
          if (r instanceof ReturnValue){
            if (r.type == 'continue') continue
            if (r.type == 'break') break
            result = r
            break
          }

          infinite.check()
        }
        leaveBlock()

        return result

      case 'WhileStatement':
        var infinite = InfiniteChecker(maxIterations)
        while (walk(node.test)){
          walk(node.body)
          infinite.check()
        }
        break

      case 'TryStatement':
        try {
          walk(node.block)
        } catch (error) {
          enterBlock()
          var catchClause = node.handlers[0]
          if (catchClause) {
            blockContext[catchClause.param.name] = error
            walk(catchClause.body)
          }
          leaveBlock()
        } finally {
          if (node.finalizer) {
            walk(node.finalizer)
          }
        }
        break

      case 'Literal':
        return node.value

      case 'UnaryExpression':
        var val = walk(node.argument)
        switch(node.operator) {
          case '+': return +val
          case '-': return -val
          case '~': return ~val
          case '!': return !val
          case 'typeof': return typeof val
          default: return unsupportedExpression(node)
        }

      case 'ArrayExpression':
        var obj = blockContext['Array']()
        for (var i=0;i<node.elements.length;i++){
          obj.push(walk(node.elements[i]))
        }
        return obj

      case 'ObjectExpression':
        var obj = blockContext['Object']()
        for (var i = 0; i < node.properties.length; i++) {
          var prop = node.properties[i]
          var value = (prop.value === null) ? prop.value : walk(prop.value)
          obj[prop.key.value || prop.key.name] = value
        }
        return obj

      case 'NewExpression':
        var args = node.arguments.map(function(arg){
          return walk(arg)
        })
        var target = walk(node.callee)
        return primitives.applyNew(target, args)


      case 'BinaryExpression':
        var l = walk(node.left)
        var r = walk(node.right)
        switch(node.operator) {
          case '==':  return l === r
          case '===': return l === r
          case '!=':  return l != r
          case '!==': return l !== r
          case '+':   return l + r
          case '-':   return l - r
          case '*':   return l * r
          case '/':   return l / r
          case '%':   return l % r
          case '<':   return l < r
          case '<=':  return l <= r
          case '>':   return l > r
          case '>=':  return l >= r
          case '|':   return l | r
          case '&':   return l & r
          case '^':   return l ^ r
          case 'instanceof': return l instanceof r
          default: return unsupportedExpression(node)
        }

      case 'LogicalExpression':
        switch(node.operator) {
          case '&&':  return walk(node.left) && walk(node.right)
          case '||':  return walk(node.left) || walk(node.right)
          default: return unsupportedExpression(node)
        }

      case 'ThisExpression':
        return blockContext['this']

      case 'Identifier':
        if (node.name === 'undefined'){
          return undefined
        } else if (hasProperty(blockContext, node.name, primitives)){
          return finalValue(blockContext[node.name])
        } else {
          throw new ReferenceError(node.name + ' is not defined')
        }

      case 'CallExpression':
        var args = node.arguments.map(function(arg){
          return walk(arg)
        })
        var object = null
        var target = walk(node.callee)

        if (node.callee.type === 'MemberExpression'){
          object = walk(node.callee.object)
        }
        return target.apply(object, args)

      case 'MemberExpression':
        var obj = walk(node.object)
        if (node.computed){
          var prop = walk(node.property)
        } else {
          var prop = node.property.name
        }
        obj = primitives.getPropertyObject(obj, prop)
        return checkValue(obj[prop]);

      case 'ConditionalExpression':
        var val = walk(node.test)
        return val ? walk(node.consequent) : walk(node.alternate)

      case 'EmptyStatement':
        return

      default:
        return unsupportedExpression(node)
    }
  }

  // safely retrieve a value
  function checkValue(value){
    if (value === Function$1){
      value = safeFunction
    }
    return finalValue(value)
  }

  // block scope context control
  function enterBlock(){
    blockContext = Object.create(blockContext)
  }
  function leaveBlock(){
    blockContext = Object.getPrototypeOf(blockContext)
  }

  // set a value in the specified context if allowed
  function setValue(object, left, right, operator){
    var name = null

    if (left.type === 'Identifier'){
      name = left.name
      // handle parent context shadowing
      object = objectForKey(object, name, primitives)
    } else if (left.type === 'MemberExpression'){
      if (left.computed){
        name = walk(left.property)
      } else {
        name = left.property.name
      }
      object = walk(left.object)
    }

    // stop built in properties from being able to be changed
    if (canSetProperty(object, name, primitives)){
      switch(operator) {
        case undefined: return object[name] = walk(right)
        case '=':  return object[name] = walk(right)
        case '+=': return object[name] += walk(right)
        case '-=': return object[name] -= walk(right)
        case '++': return object[name]++
        case '--': return object[name]--
      }
    }

  }

}