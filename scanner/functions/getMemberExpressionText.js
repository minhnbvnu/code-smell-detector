function getMemberExpressionText(node) {
                let objectText;
                // cases should match the list in ALLOWED_MEMBER_OBJECT_TYPES
                switch (node.object.type) {
                    case utils_1.AST_NODE_TYPES.MemberExpression:
                        objectText = getMemberExpressionText(node.object);
                        break;
                    case utils_1.AST_NODE_TYPES.CallExpression:
                    case utils_1.AST_NODE_TYPES.Identifier:
                    case utils_1.AST_NODE_TYPES.MetaProperty:
                    case utils_1.AST_NODE_TYPES.ThisExpression:
                        objectText = getText(node.object);
                        break;
                    /* istanbul ignore next */
                    default:
                        return '';
                }
                let propertyText;
                if (node.computed) {
                    // cases should match the list in ALLOWED_COMPUTED_PROP_TYPES
                    switch (node.property.type) {
                        case utils_1.AST_NODE_TYPES.Identifier:
                            propertyText = getText(node.property);
                            break;
                        case utils_1.AST_NODE_TYPES.Literal:
                        case utils_1.AST_NODE_TYPES.TemplateLiteral:
                        case utils_1.AST_NODE_TYPES.BinaryExpression:
                            propertyText = sourceCode.getText(node.property);
                            break;
                        case utils_1.AST_NODE_TYPES.MemberExpression:
                            propertyText = getMemberExpressionText(node.property);
                            break;
                        /* istanbul ignore next */
                        default:
                            return '';
                    }
                    return `${objectText}${node.optional ? '?.' : ''}[${propertyText}]`;
                }
                else {
                    // cases should match the list in ALLOWED_NON_COMPUTED_PROP_TYPES
                    switch (node.property.type) {
                        case utils_1.AST_NODE_TYPES.Identifier:
                            propertyText = getText(node.property);
                            break;
                        case utils_1.AST_NODE_TYPES.PrivateIdentifier:
                            propertyText = '#' + getText(node.property);
                            break;
                        default:
                            propertyText = sourceCode.getText(node.property);
                    }
                    return `${objectText}${node.optional ? '?.' : '.'}${propertyText}`;
                }
            }