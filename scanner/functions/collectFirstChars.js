function collectFirstChars(node, sepNodes, globalScope, outNextChars) {
    switch (node.type) {
        case "AssignmentExpression":
            collectFirstChars(node.right, sepNodes, globalScope, outNextChars)
            break
        case "BinaryExpression":
            collectFirstChars(node.left, sepNodes, globalScope, outNextChars)
            break
        case "ConditionalExpression":
            collectFirstChars(
                node.consequent,
                sepNodes,
                globalScope,
                outNextChars
            )
            collectFirstChars(
                node.alternate,
                sepNodes,
                globalScope,
                outNextChars
            )
            break
        case "LogicalExpression":
            collectFirstChars(node.left, sepNodes, globalScope, outNextChars)
            collectFirstChars(node.right, sepNodes, globalScope, outNextChars)
            break
        case "SequenceExpression":
            collectFirstChars(
                node.expressions[node.expressions.length - 1],
                sepNodes,
                globalScope,
                outNextChars
            )
            break
        case "TemplateLiteral":
            collectFirstCharsOfTemplateElement(
                node,
                0,
                sepNodes,
                globalScope,
                outNextChars
            )
            break

        case "Identifier":
        case "MemberExpression":
            if (sepNodes.has(node)) {
                outNextChars.push(path.sep)
                break
            }
        // fallthrough
        default: {
            const str = getStringIfConstant(node, globalScope)
            if (str) {
                outNextChars.push(str[0])
            }
        }
    }
}