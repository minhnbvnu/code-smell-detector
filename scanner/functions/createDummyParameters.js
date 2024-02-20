function createDummyParameters(argCount, names, types, minArgumentCount, inJs) {
            const parameters = [];
            const parameterNameCounts = /* @__PURE__ */ new Map();
            for (let i = 0; i < argCount; i++) {
                const parameterName = (names == null ? void 0 : names[i]) || `arg${i}`;
                const parameterNameCount = parameterNameCounts.get(parameterName);
                parameterNameCounts.set(parameterName, (parameterNameCount || 0) + 1);
                const newParameter = factory.createParameterDeclaration(
                /*modifiers*/
                void 0, 
                /*dotDotDotToken*/
                void 0, 
                /*name*/
                parameterName + (parameterNameCount || ""), 
                /*questionToken*/
                minArgumentCount !== void 0 && i >= minArgumentCount ? factory.createToken(57 /* QuestionToken */) : void 0, 
                /*type*/
                inJs ? void 0 : (types == null ? void 0 : types[i]) || factory.createKeywordTypeNode(157 /* UnknownKeyword */), 
                /*initializer*/
                void 0);
                parameters.push(newParameter);
            }
            return parameters;
        }