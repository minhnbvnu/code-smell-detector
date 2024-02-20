function getContextuallyTypedParameterType(parameter) {
                const func = parameter.parent;
                if (!isContextSensitiveFunctionOrObjectLiteralMethod(func)) {
                    return void 0;
                }
                const iife = getImmediatelyInvokedFunctionExpression(func);
                if (iife && iife.arguments) {
                    const args = getEffectiveCallArguments(iife);
                    const indexOfParameter = func.parameters.indexOf(parameter);
                    if (parameter.dotDotDotToken) {
                        return getSpreadArgumentType(args, indexOfParameter, args.length, anyType, 
                        /*context*/
                        void 0, 0 /* Normal */);
                    }
                    const links = getNodeLinks(iife);
                    const cached = links.resolvedSignature;
                    links.resolvedSignature = anySignature;
                    const type = indexOfParameter < args.length ? getWidenedLiteralType(checkExpression(args[indexOfParameter])) : parameter.initializer ? void 0 : undefinedWideningType;
                    links.resolvedSignature = cached;
                    return type;
                }
                const contextualSignature = getContextualSignature(func);
                if (contextualSignature) {
                    const index = func.parameters.indexOf(parameter) - (getThisParameter(func) ? 1 : 0);
                    return parameter.dotDotDotToken && lastOrUndefined(func.parameters) === parameter ? getRestTypeAtPosition(contextualSignature, index) : tryGetTypeAtPosition(contextualSignature, index);
                }
            }