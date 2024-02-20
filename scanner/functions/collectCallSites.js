function collectCallSites(program, node) {
            const callSites = [];
            const collect = createCallSiteCollector(program, callSites);
            switch (node.kind) {
                case 308 /* SourceFile */:
                    collectCallSitesOfSourceFile(node, collect);
                    break;
                case 264 /* ModuleDeclaration */:
                    collectCallSitesOfModuleDeclaration(node, collect);
                    break;
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    collectCallSitesOfFunctionLikeDeclaration(program.getTypeChecker(), node, collect);
                    break;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                    collectCallSitesOfClassLikeDeclaration(node, collect);
                    break;
                case 172 /* ClassStaticBlockDeclaration */:
                    collectCallSitesOfClassStaticBlockDeclaration(node, collect);
                    break;
                default:
                    Debug.assertNever(node);
            }
            return callSites;
        }