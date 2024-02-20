function addConstructor(statements, node, name, extendsClauseElement) {
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(32662 /* ConstructorExcludes */, 73 /* ConstructorIncludes */);
                const constructor = getFirstConstructorWithBody(node);
                const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, extendsClauseElement !== void 0);
                const constructorFunction = factory2.createFunctionDeclaration(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, name, 
                /*typeParameters*/
                void 0, transformConstructorParameters(constructor, hasSynthesizedSuper), 
                /*type*/
                void 0, transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper));
                setTextRange(constructorFunction, constructor || node);
                if (extendsClauseElement) {
                    setEmitFlags(constructorFunction, 16 /* CapturesThis */);
                }
                statements.push(constructorFunction);
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
            }