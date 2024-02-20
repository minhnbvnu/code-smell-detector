function createDescriptorMethod(original, name, modifiers, asteriskToken, kind, parameters, body) {
                const func = factory2.createFunctionExpression(modifiers, asteriskToken, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body != null ? body : factory2.createBlock([]));
                setOriginalNode(func, original);
                setSourceMapRange(func, moveRangePastDecorators(original));
                setEmitFlags(func, 3072 /* NoComments */);
                const prefix = kind === "get" || kind === "set" ? kind : void 0;
                const functionName = factory2.createStringLiteralFromNode(name, 
                /*isSingleQuote*/
                void 0);
                const namedFunction = emitHelpers().createSetFunctionNameHelper(func, functionName, prefix);
                const method = factory2.createPropertyAssignment(factory2.createIdentifier(kind), namedFunction);
                setOriginalNode(method, original);
                setSourceMapRange(method, moveRangePastDecorators(original));
                setEmitFlags(method, 3072 /* NoComments */);
                return method;
            }