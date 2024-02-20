function createEmitHelperFactory(context) {
            const factory2 = context.factory;
            const immutableTrue = memoize(() => setInternalEmitFlags(factory2.createTrue(), 8 /* Immutable */));
            const immutableFalse = memoize(() => setInternalEmitFlags(factory2.createFalse(), 8 /* Immutable */));
            return {
                getUnscopedHelperName,
                // TypeScript Helpers
                createDecorateHelper,
                createMetadataHelper,
                createParamHelper,
                // ES Decorators Helpers
                createESDecorateHelper,
                createRunInitializersHelper,
                // ES2018 Helpers
                createAssignHelper,
                createAwaitHelper,
                createAsyncGeneratorHelper,
                createAsyncDelegatorHelper,
                createAsyncValuesHelper,
                // ES2018 Destructuring Helpers
                createRestHelper,
                // ES2017 Helpers
                createAwaiterHelper,
                // ES2015 Helpers
                createExtendsHelper,
                createTemplateObjectHelper,
                createSpreadArrayHelper,
                createPropKeyHelper,
                createSetFunctionNameHelper,
                // ES2015 Destructuring Helpers
                createValuesHelper,
                createReadHelper,
                // ES2015 Generator Helpers
                createGeneratorHelper,
                // ES Module Helpers
                createCreateBindingHelper,
                createImportStarHelper,
                createImportStarCallbackHelper,
                createImportDefaultHelper,
                createExportStarHelper,
                // Class Fields Helpers
                createClassPrivateFieldGetHelper,
                createClassPrivateFieldSetHelper,
                createClassPrivateFieldInHelper
            };
            function getUnscopedHelperName(name) {
                return setEmitFlags(factory2.createIdentifier(name), 8192 /* HelperName */ | 4 /* AdviseOnEmitNode */);
            }
            function createDecorateHelper(decoratorExpressions, target, memberName, descriptor) {
                context.requestEmitHelper(decorateHelper);
                const argumentsArray = [];
                argumentsArray.push(factory2.createArrayLiteralExpression(decoratorExpressions, 
                /*multiLine*/
                true));
                argumentsArray.push(target);
                if (memberName) {
                    argumentsArray.push(memberName);
                    if (descriptor) {
                        argumentsArray.push(descriptor);
                    }
                }
                return factory2.createCallExpression(getUnscopedHelperName("__decorate"), 
                /*typeArguments*/
                void 0, argumentsArray);
            }
            function createMetadataHelper(metadataKey, metadataValue) {
                context.requestEmitHelper(metadataHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__metadata"), 
                /*typeArguments*/
                void 0, [
                    factory2.createStringLiteral(metadataKey),
                    metadataValue
                ]);
            }
            function createParamHelper(expression, parameterOffset, location) {
                context.requestEmitHelper(paramHelper);
                return setTextRange(factory2.createCallExpression(getUnscopedHelperName("__param"), 
                /*typeArguments*/
                void 0, [
                    factory2.createNumericLiteral(parameterOffset + ""),
                    expression
                ]), location);
            }
            function createESDecorateClassContextObject(contextIn) {
                return factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment(factory2.createIdentifier("kind"), factory2.createStringLiteral("class")),
                    factory2.createPropertyAssignment(factory2.createIdentifier("name"), contextIn.name)
                ]);
            }
            function createESDecorateClassElementAccessGetMethod(elementName) {
                const accessor = elementName.computed ? factory2.createElementAccessExpression(factory2.createIdentifier("obj"), elementName.name) : factory2.createPropertyAccessExpression(factory2.createIdentifier("obj"), elementName.name);
                return factory2.createPropertyAssignment("get", factory2.createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("obj"))], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, accessor));
            }
            function createESDecorateClassElementAccessSetMethod(elementName) {
                const accessor = elementName.computed ? factory2.createElementAccessExpression(factory2.createIdentifier("obj"), elementName.name) : factory2.createPropertyAccessExpression(factory2.createIdentifier("obj"), elementName.name);
                return factory2.createPropertyAssignment("set", factory2.createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("obj")),
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("value"))
                ], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(accessor, factory2.createIdentifier("value")))
                ])));
            }
            function createESDecorateClassElementAccessHasMethod(elementName) {
                const propertyName = elementName.computed ? elementName.name : isIdentifier(elementName.name) ? factory2.createStringLiteralFromNode(elementName.name) : elementName.name;
                return factory2.createPropertyAssignment("has", factory2.createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("obj"))], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, factory2.createBinaryExpression(propertyName, 101 /* InKeyword */, factory2.createIdentifier("obj"))));
            }
            function createESDecorateClassElementAccessObject(name, access) {
                const properties = [];
                properties.push(createESDecorateClassElementAccessHasMethod(name));
                if (access.get)
                    properties.push(createESDecorateClassElementAccessGetMethod(name));
                if (access.set)
                    properties.push(createESDecorateClassElementAccessSetMethod(name));
                return factory2.createObjectLiteralExpression(properties);
            }
            function createESDecorateClassElementContextObject(contextIn) {
                return factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment(factory2.createIdentifier("kind"), factory2.createStringLiteral(contextIn.kind)),
                    factory2.createPropertyAssignment(factory2.createIdentifier("name"), contextIn.name.computed ? contextIn.name.name : factory2.createStringLiteralFromNode(contextIn.name.name)),
                    factory2.createPropertyAssignment(factory2.createIdentifier("static"), contextIn.static ? factory2.createTrue() : factory2.createFalse()),
                    factory2.createPropertyAssignment(factory2.createIdentifier("private"), contextIn.private ? factory2.createTrue() : factory2.createFalse()),
                    factory2.createPropertyAssignment(factory2.createIdentifier("access"), createESDecorateClassElementAccessObject(contextIn.name, contextIn.access))
                ]);
            }
            function createESDecorateContextObject(contextIn) {
                return contextIn.kind === "class" ? createESDecorateClassContextObject(contextIn) : createESDecorateClassElementContextObject(contextIn);
            }
            function createESDecorateHelper(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
                context.requestEmitHelper(esDecorateHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__esDecorate"), 
                /*typeArguments*/
                void 0, [
                    ctor != null ? ctor : factory2.createNull(),
                    descriptorIn != null ? descriptorIn : factory2.createNull(),
                    decorators,
                    createESDecorateContextObject(contextIn),
                    initializers,
                    extraInitializers
                ]);
            }
            function createRunInitializersHelper(thisArg, initializers, value) {
                context.requestEmitHelper(runInitializersHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__runInitializers"), 
                /*typeArguments*/
                void 0, value ? [thisArg, initializers, value] : [thisArg, initializers]);
            }
            function createAssignHelper(attributesSegments) {
                if (getEmitScriptTarget(context.getCompilerOptions()) >= 2 /* ES2015 */) {
                    return factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "assign"), 
                    /*typeArguments*/
                    void 0, attributesSegments);
                }
                context.requestEmitHelper(assignHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__assign"), 
                /*typeArguments*/
                void 0, attributesSegments);
            }
            function createAwaitHelper(expression) {
                context.requestEmitHelper(awaitHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__await"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createAsyncGeneratorHelper(generatorFunc, hasLexicalThis) {
                context.requestEmitHelper(awaitHelper);
                context.requestEmitHelper(asyncGeneratorHelper);
                (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= 524288 /* AsyncFunctionBody */ | 1048576 /* ReuseTempVariableScope */;
                return factory2.createCallExpression(getUnscopedHelperName("__asyncGenerator"), 
                /*typeArguments*/
                void 0, [
                    hasLexicalThis ? factory2.createThis() : factory2.createVoidZero(),
                    factory2.createIdentifier("arguments"),
                    generatorFunc
                ]);
            }
            function createAsyncDelegatorHelper(expression) {
                context.requestEmitHelper(awaitHelper);
                context.requestEmitHelper(asyncDelegator);
                return factory2.createCallExpression(getUnscopedHelperName("__asyncDelegator"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createAsyncValuesHelper(expression) {
                context.requestEmitHelper(asyncValues);
                return factory2.createCallExpression(getUnscopedHelperName("__asyncValues"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createRestHelper(value, elements, computedTempVariables, location) {
                context.requestEmitHelper(restHelper);
                const propertyNames = [];
                let computedTempVariableOffset = 0;
                for (let i = 0; i < elements.length - 1; i++) {
                    const propertyName = getPropertyNameOfBindingOrAssignmentElement(elements[i]);
                    if (propertyName) {
                        if (isComputedPropertyName(propertyName)) {
                            Debug.assertIsDefined(computedTempVariables, "Encountered computed property name but 'computedTempVariables' argument was not provided.");
                            const temp = computedTempVariables[computedTempVariableOffset];
                            computedTempVariableOffset++;
                            propertyNames.push(factory2.createConditionalExpression(factory2.createTypeCheck(temp, "symbol"), 
                            /*questionToken*/
                            void 0, temp, 
                            /*colonToken*/
                            void 0, factory2.createAdd(temp, factory2.createStringLiteral(""))));
                        }
                        else {
                            propertyNames.push(factory2.createStringLiteralFromNode(propertyName));
                        }
                    }
                }
                return factory2.createCallExpression(getUnscopedHelperName("__rest"), 
                /*typeArguments*/
                void 0, [
                    value,
                    setTextRange(factory2.createArrayLiteralExpression(propertyNames), location)
                ]);
            }
            function createAwaiterHelper(hasLexicalThis, hasLexicalArguments, promiseConstructor, body) {
                context.requestEmitHelper(awaiterHelper);
                const generatorFunc = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, factory2.createToken(41 /* AsteriskToken */), 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                [], 
                /*type*/
                void 0, body);
                (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= 524288 /* AsyncFunctionBody */ | 1048576 /* ReuseTempVariableScope */;
                return factory2.createCallExpression(getUnscopedHelperName("__awaiter"), 
                /*typeArguments*/
                void 0, [
                    hasLexicalThis ? factory2.createThis() : factory2.createVoidZero(),
                    hasLexicalArguments ? factory2.createIdentifier("arguments") : factory2.createVoidZero(),
                    promiseConstructor ? createExpressionFromEntityName(factory2, promiseConstructor) : factory2.createVoidZero(),
                    generatorFunc
                ]);
            }
            function createExtendsHelper(name) {
                context.requestEmitHelper(extendsHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__extends"), 
                /*typeArguments*/
                void 0, [name, factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */)]);
            }
            function createTemplateObjectHelper(cooked, raw) {
                context.requestEmitHelper(templateObjectHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__makeTemplateObject"), 
                /*typeArguments*/
                void 0, [cooked, raw]);
            }
            function createSpreadArrayHelper(to, from, packFrom) {
                context.requestEmitHelper(spreadArrayHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__spreadArray"), 
                /*typeArguments*/
                void 0, [to, from, packFrom ? immutableTrue() : immutableFalse()]);
            }
            function createPropKeyHelper(expr) {
                context.requestEmitHelper(propKeyHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__propKey"), 
                /*typeArguments*/
                void 0, [expr]);
            }
            function createSetFunctionNameHelper(f, name, prefix) {
                context.requestEmitHelper(setFunctionNameHelper);
                return context.factory.createCallExpression(getUnscopedHelperName("__setFunctionName"), 
                /*typeArguments*/
                void 0, prefix ? [f, name, context.factory.createStringLiteral(prefix)] : [f, name]);
            }
            function createValuesHelper(expression) {
                context.requestEmitHelper(valuesHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__values"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createReadHelper(iteratorRecord, count) {
                context.requestEmitHelper(readHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__read"), 
                /*typeArguments*/
                void 0, count !== void 0 ? [iteratorRecord, factory2.createNumericLiteral(count + "")] : [iteratorRecord]);
            }
            function createGeneratorHelper(body) {
                context.requestEmitHelper(generatorHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__generator"), 
                /*typeArguments*/
                void 0, [factory2.createThis(), body]);
            }
            function createCreateBindingHelper(module2, inputName, outputName) {
                context.requestEmitHelper(createBindingHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__createBinding"), 
                /*typeArguments*/
                void 0, [factory2.createIdentifier("exports"), module2, inputName, ...outputName ? [outputName] : []]);
            }
            function createImportStarHelper(expression) {
                context.requestEmitHelper(importStarHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__importStar"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createImportStarCallbackHelper() {
                context.requestEmitHelper(importStarHelper);
                return getUnscopedHelperName("__importStar");
            }
            function createImportDefaultHelper(expression) {
                context.requestEmitHelper(importDefaultHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__importDefault"), 
                /*typeArguments*/
                void 0, [expression]);
            }
            function createExportStarHelper(moduleExpression, exportsExpression = factory2.createIdentifier("exports")) {
                context.requestEmitHelper(exportStarHelper);
                context.requestEmitHelper(createBindingHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__exportStar"), 
                /*typeArguments*/
                void 0, [moduleExpression, exportsExpression]);
            }
            function createClassPrivateFieldGetHelper(receiver, state, kind, f) {
                context.requestEmitHelper(classPrivateFieldGetHelper);
                let args;
                if (!f) {
                    args = [receiver, state, factory2.createStringLiteral(kind)];
                }
                else {
                    args = [receiver, state, factory2.createStringLiteral(kind), f];
                }
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldGet"), 
                /*typeArguments*/
                void 0, args);
            }
            function createClassPrivateFieldSetHelper(receiver, state, value, kind, f) {
                context.requestEmitHelper(classPrivateFieldSetHelper);
                let args;
                if (!f) {
                    args = [receiver, state, value, factory2.createStringLiteral(kind)];
                }
                else {
                    args = [receiver, state, value, factory2.createStringLiteral(kind), f];
                }
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldSet"), 
                /*typeArguments*/
                void 0, args);
            }
            function createClassPrivateFieldInHelper(state, receiver) {
                context.requestEmitHelper(classPrivateFieldInHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__classPrivateFieldIn"), 
                /* typeArguments*/
                void 0, [state, receiver]);
            }
        }