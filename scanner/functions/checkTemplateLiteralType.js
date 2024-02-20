function checkTemplateLiteralType(node) {
                for (const span of node.templateSpans) {
                    checkSourceElement(span.type);
                    const type = getTypeFromTypeNode(span.type);
                    checkTypeAssignableTo(type, templateConstraintType, span.type);
                }
                getTypeFromTypeNode(node);
            }