function insertDefaultValueAssignmentForInitializer(statements, parameter, name, initializer) {
                initializer = Debug.checkDefined(visitNode(initializer, visitor, isExpression));
                const statement = factory2.createIfStatement(factory2.createTypeCheck(factory2.cloneNode(name), "undefined"), setEmitFlags(setTextRange(factory2.createBlock([
                    factory2.createExpressionStatement(setEmitFlags(setTextRange(factory2.createAssignment(
                    // TODO(rbuckton): Does this need to be parented?
                    setEmitFlags(setParent(setTextRange(factory2.cloneNode(name), name), name.parent), 96 /* NoSourceMap */), setEmitFlags(initializer, 96 /* NoSourceMap */ | getEmitFlags(initializer) | 3072 /* NoComments */)), parameter), 3072 /* NoComments */))
                ]), parameter), 1 /* SingleLine */ | 64 /* NoTrailingSourceMap */ | 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */));
                startOnNewLine(statement);
                setTextRange(statement, parameter);
                setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2097152 /* CustomPrologue */ | 3072 /* NoComments */);
                insertStatementAfterCustomPrologue(statements, statement);
            }