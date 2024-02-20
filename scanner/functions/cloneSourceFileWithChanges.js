function cloneSourceFileWithChanges(source, statements, isDeclarationFile, referencedFiles, typeReferences, hasNoDefaultLib, libReferences) {
                const node = cloneSourceFile(source);
                node.statements = createNodeArray(statements);
                node.isDeclarationFile = isDeclarationFile;
                node.referencedFiles = referencedFiles;
                node.typeReferenceDirectives = typeReferences;
                node.hasNoDefaultLib = hasNoDefaultLib;
                node.libReferenceDirectives = libReferences;
                node.transformFlags = propagateChildrenFlags(node.statements) | propagateChildFlags(node.endOfFileToken);
                return node;
            }