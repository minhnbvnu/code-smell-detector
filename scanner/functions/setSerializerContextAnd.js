function setSerializerContextAnd(serializerContext, cb, node, arg) {
                const savedCurrentLexicalScope = currentLexicalScope;
                const savedCurrentNameScope = currentNameScope;
                currentLexicalScope = serializerContext.currentLexicalScope;
                currentNameScope = serializerContext.currentNameScope;
                const result = arg === void 0 ? cb(node) : cb(node, arg);
                currentLexicalScope = savedCurrentLexicalScope;
                currentNameScope = savedCurrentNameScope;
                return result;
            }