function transformAccessorsToStatement(receiver, accessors, container) {
                const statement = factory2.createExpressionStatement(transformAccessorsToExpression(receiver, accessors, container, 
                /*startsOnNewLine*/
                false));
                setEmitFlags(statement, 3072 /* NoComments */);
                setSourceMapRange(statement, getSourceMapRange(accessors.firstAccessor));
                return statement;
            }