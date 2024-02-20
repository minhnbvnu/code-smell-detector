function transformJSDocTypeReference(node) {
            let name = node.typeName;
            let args = node.typeArguments;
            if (isIdentifier(node.typeName)) {
                if (isJSDocIndexSignature(node)) {
                    return transformJSDocIndexSignature(node);
                }
                let text = node.typeName.text;
                switch (node.typeName.text) {
                    case "String":
                    case "Boolean":
                    case "Object":
                    case "Number":
                        text = text.toLowerCase();
                        break;
                    case "array":
                    case "date":
                    case "promise":
                        text = text[0].toUpperCase() + text.slice(1);
                        break;
                }
                name = factory.createIdentifier(text);
                if ((text === "Array" || text === "Promise") && !node.typeArguments) {
                    args = factory.createNodeArray([factory.createTypeReferenceNode("any", emptyArray)]);
                }
                else {
                    args = visitNodes2(node.typeArguments, transformJSDocType, isTypeNode);
                }
            }
            return factory.createTypeReferenceNode(name, args);
        }