function transformProperty(property, receiver) {
                var _a2;
                const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                const transformed = transformPropertyWorker(property, receiver);
                if (transformed && hasStaticModifier(property) && ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.facts)) {
                    setOriginalNode(transformed, property);
                    addEmitFlags(transformed, 4 /* AdviseOnEmitNode */);
                    setSourceMapRange(transformed, getSourceMapRange(property.name));
                    lexicalEnvironmentMap.set(getOriginalNode(property), lexicalEnvironment);
                }
                currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
                return transformed;
            }