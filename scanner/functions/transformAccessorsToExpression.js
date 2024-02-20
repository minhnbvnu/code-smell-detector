function transformAccessorsToExpression(receiver, { firstAccessor, getAccessor, setAccessor }, container, startsOnNewLine) {
                const target = setParent(setTextRange(factory2.cloneNode(receiver), receiver), receiver.parent);
                setEmitFlags(target, 3072 /* NoComments */ | 64 /* NoTrailingSourceMap */);
                setSourceMapRange(target, firstAccessor.name);
                const visitedAccessorName = visitNode(firstAccessor.name, visitor, isPropertyName);
                Debug.assert(visitedAccessorName);
                if (isPrivateIdentifier(visitedAccessorName)) {
                    return Debug.failBadSyntaxKind(visitedAccessorName, "Encountered unhandled private identifier while transforming ES2015.");
                }
                const propertyName = createExpressionForPropertyName(factory2, visitedAccessorName);
                setEmitFlags(propertyName, 3072 /* NoComments */ | 32 /* NoLeadingSourceMap */);
                setSourceMapRange(propertyName, firstAccessor.name);
                const properties = [];
                if (getAccessor) {
                    const getterFunction = transformFunctionLikeToExpression(getAccessor, 
                    /*location*/
                    void 0, 
                    /*name*/
                    void 0, container);
                    setSourceMapRange(getterFunction, getSourceMapRange(getAccessor));
                    setEmitFlags(getterFunction, 1024 /* NoLeadingComments */);
                    const getter = factory2.createPropertyAssignment("get", getterFunction);
                    setCommentRange(getter, getCommentRange(getAccessor));
                    properties.push(getter);
                }
                if (setAccessor) {
                    const setterFunction = transformFunctionLikeToExpression(setAccessor, 
                    /*location*/
                    void 0, 
                    /*name*/
                    void 0, container);
                    setSourceMapRange(setterFunction, getSourceMapRange(setAccessor));
                    setEmitFlags(setterFunction, 1024 /* NoLeadingComments */);
                    const setter = factory2.createPropertyAssignment("set", setterFunction);
                    setCommentRange(setter, getCommentRange(setAccessor));
                    properties.push(setter);
                }
                properties.push(factory2.createPropertyAssignment("enumerable", getAccessor || setAccessor ? factory2.createFalse() : factory2.createTrue()), factory2.createPropertyAssignment("configurable", factory2.createTrue()));
                const call = factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "defineProperty"), 
                /*typeArguments*/
                void 0, [
                    target,
                    propertyName,
                    factory2.createObjectLiteralExpression(properties, 
                    /*multiLine*/
                    true)
                ]);
                if (startsOnNewLine) {
                    startOnNewLine(call);
                }
                return call;
            }