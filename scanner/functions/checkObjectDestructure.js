function checkObjectDestructure(receiverNode, senderType, senderNode) {
                const properties = new Map(senderType
                    .getProperties()
                    .map(property => [
                    property.getName(),
                    checker.getTypeOfSymbolAtLocation(property, senderNode),
                ]));
                let didReport = false;
                for (const receiverProperty of receiverNode.properties) {
                    if (receiverProperty.type === utils_1.AST_NODE_TYPES.RestElement) {
                        // don't bother checking rest
                        continue;
                    }
                    let key;
                    if (receiverProperty.computed === false) {
                        key =
                            receiverProperty.key.type === utils_1.AST_NODE_TYPES.Identifier
                                ? receiverProperty.key.name
                                : String(receiverProperty.key.value);
                    }
                    else if (receiverProperty.key.type === utils_1.AST_NODE_TYPES.Literal) {
                        key = String(receiverProperty.key.value);
                    }
                    else if (receiverProperty.key.type === utils_1.AST_NODE_TYPES.TemplateLiteral &&
                        receiverProperty.key.quasis.length === 1) {
                        key = String(receiverProperty.key.quasis[0].value.cooked);
                    }
                    else {
                        // can't figure out the name, so skip it
                        continue;
                    }
                    const senderType = properties.get(key);
                    if (!senderType) {
                        continue;
                    }
                    // check for the any type first so we can handle {x: {y: z}} = {x: any}
                    if (util.isTypeAnyType(senderType)) {
                        context.report({
                            node: receiverProperty.value,
                            messageId: 'unsafeArrayPatternFromTuple',
                        });
                        didReport = true;
                    }
                    else if (receiverProperty.value.type === utils_1.AST_NODE_TYPES.ArrayPattern) {
                        didReport = checkArrayDestructure(receiverProperty.value, senderType, senderNode);
                    }
                    else if (receiverProperty.value.type === utils_1.AST_NODE_TYPES.ObjectPattern) {
                        didReport = checkObjectDestructure(receiverProperty.value, senderType, senderNode);
                    }
                }
                return didReport;
            }