function transformJSDocParameter(node) {
            const index = node.parent.parameters.indexOf(node);
            const isRest = node.type.kind === 321 /* JSDocVariadicType */ && index === node.parent.parameters.length - 1;
            const name = node.name || (isRest ? "rest" : "arg" + index);
            const dotdotdot = isRest ? factory.createToken(25 /* DotDotDotToken */) : node.dotDotDotToken;
            return factory.createParameterDeclaration(node.modifiers, dotdotdot, name, node.questionToken, visitNode(node.type, transformJSDocType, isTypeNode), node.initializer);
        }