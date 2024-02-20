function shouldEmitExplicitInitializerForLetDeclaration(node) {
                const flags = resolver.getNodeCheckFlags(node);
                const isCapturedInFunction = flags & 16384 /* CapturedBlockScopedBinding */;
                const isDeclaredInLoop = flags & 32768 /* BlockScopedBindingInLoop */;
                const emittedAsTopLevel = (hierarchyFacts & 64 /* TopLevel */) !== 0 || isCapturedInFunction && isDeclaredInLoop && (hierarchyFacts & 512 /* IterationStatementBlock */) !== 0;
                const emitExplicitInitializer = !emittedAsTopLevel && (hierarchyFacts & 4096 /* ForInOrForOfStatement */) === 0 && (!resolver.isDeclarationWithCollidingName(node) || isDeclaredInLoop && !isCapturedInFunction && (hierarchyFacts & (2048 /* ForStatement */ | 4096 /* ForInOrForOfStatement */)) === 0);
                return emitExplicitInitializer;
            }