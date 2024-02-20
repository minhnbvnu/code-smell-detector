function appendObjectRestAssignmentsIfNeeded(statements, node) {
                let containsPrecedingObjectRestOrSpread = false;
                for (const parameter of node.parameters) {
                    if (containsPrecedingObjectRestOrSpread) {
                        if (isBindingPattern(parameter.name)) {
                            if (parameter.name.elements.length > 0) {
                                const declarations = flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, factory2.getGeneratedNameForNode(parameter));
                                if (some(declarations)) {
                                    const declarationList = factory2.createVariableDeclarationList(declarations);
                                    const statement = factory2.createVariableStatement(
                                    /*modifiers*/
                                    void 0, declarationList);
                                    setEmitFlags(statement, 2097152 /* CustomPrologue */);
                                    statements = append(statements, statement);
                                }
                            }
                            else if (parameter.initializer) {
                                const name = factory2.getGeneratedNameForNode(parameter);
                                const initializer = visitNode(parameter.initializer, visitor, isExpression);
                                const assignment = factory2.createAssignment(name, initializer);
                                const statement = factory2.createExpressionStatement(assignment);
                                setEmitFlags(statement, 2097152 /* CustomPrologue */);
                                statements = append(statements, statement);
                            }
                        }
                        else if (parameter.initializer) {
                            const name = factory2.cloneNode(parameter.name);
                            setTextRange(name, parameter.name);
                            setEmitFlags(name, 96 /* NoSourceMap */);
                            const initializer = visitNode(parameter.initializer, visitor, isExpression);
                            addEmitFlags(initializer, 96 /* NoSourceMap */ | 3072 /* NoComments */);
                            const assignment = factory2.createAssignment(name, initializer);
                            setTextRange(assignment, parameter);
                            setEmitFlags(assignment, 3072 /* NoComments */);
                            const block = factory2.createBlock([factory2.createExpressionStatement(assignment)]);
                            setTextRange(block, parameter);
                            setEmitFlags(block, 1 /* SingleLine */ | 64 /* NoTrailingSourceMap */ | 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */);
                            const typeCheck = factory2.createTypeCheck(factory2.cloneNode(parameter.name), "undefined");
                            const statement = factory2.createIfStatement(typeCheck, block);
                            startOnNewLine(statement);
                            setTextRange(statement, parameter);
                            setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2097152 /* CustomPrologue */ | 3072 /* NoComments */);
                            statements = append(statements, statement);
                        }
                    }
                    else if (parameter.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                        containsPrecedingObjectRestOrSpread = true;
                        const declarations = flattenDestructuringBinding(parameter, visitor, context, 1 /* ObjectRest */, factory2.getGeneratedNameForNode(parameter), 
                        /*doNotRecordTempVariablesInLine*/
                        false, 
                        /*skipInitializer*/
                        true);
                        if (some(declarations)) {
                            const declarationList = factory2.createVariableDeclarationList(declarations);
                            const statement = factory2.createVariableStatement(
                            /*modifiers*/
                            void 0, declarationList);
                            setEmitFlags(statement, 2097152 /* CustomPrologue */);
                            statements = append(statements, statement);
                        }
                    }
                }
                return statements;
            }