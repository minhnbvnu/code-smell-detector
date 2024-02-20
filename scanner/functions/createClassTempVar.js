function createClassTempVar() {
                    var _a3;
                    if (shouldTransformPrivateElementsOrClassStaticBlocks && ((_a3 = node.emitNode) == null ? void 0 : _a3.classThis)) {
                        return getClassLexicalEnvironment().classConstructor = node.emitNode.classThis;
                    }
                    const classCheckFlags = resolver.getNodeCheckFlags(node);
                    const isClassWithConstructorReference2 = classCheckFlags & 1048576 /* ClassWithConstructorReference */;
                    const requiresBlockScopedVar = classCheckFlags & 32768 /* BlockScopedBindingInLoop */;
                    const temp2 = factory2.createTempVariable(requiresBlockScopedVar ? addBlockScopedVariable : hoistVariableDeclaration, !!isClassWithConstructorReference2);
                    getClassLexicalEnvironment().classConstructor = factory2.cloneNode(temp2);
                    return temp2;
                }