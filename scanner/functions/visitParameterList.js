function visitParameterList(nodes, visitor, context, nodesVisitor = visitNodes2) {
            let updated;
            context.startLexicalEnvironment();
            if (nodes) {
                context.setLexicalEnvironmentFlags(1 /* InParameters */, true);
                updated = nodesVisitor(nodes, visitor, isParameter);
                if (context.getLexicalEnvironmentFlags() & 2 /* VariablesHoistedInParameters */ && getEmitScriptTarget(context.getCompilerOptions()) >= 2 /* ES2015 */) {
                    updated = addDefaultValueAssignmentsIfNeeded(updated, context);
                }
                context.setLexicalEnvironmentFlags(1 /* InParameters */, false);
            }
            context.suspendLexicalEnvironment();
            return updated;
        }