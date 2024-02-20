function createBindingElement(dotDotDotToken, propertyName, name, initializer) {
                const node = createBaseDeclaration(205 /* BindingElement */);
                node.dotDotDotToken = dotDotDotToken;
                node.propertyName = asName(propertyName);
                node.name = asName(name);
                node.initializer = asInitializer(initializer);
                node.transformFlags |= propagateChildFlags(node.dotDotDotToken) | propagateNameFlags(node.propertyName) | propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (node.dotDotDotToken ? 32768 /* ContainsRestOrSpread */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.flowNode = void 0;
                return node;
            }