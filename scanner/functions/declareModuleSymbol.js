function declareModuleSymbol(node) {
                const state = getModuleInstanceState(node);
                const instantiated = state !== 0 /* NonInstantiated */;
                declareSymbolAndAddToSymbolTable(node, instantiated ? 512 /* ValueModule */ : 1024 /* NamespaceModule */, instantiated ? 110735 /* ValueModuleExcludes */ : 0 /* NamespaceModuleExcludes */);
                return state;
            }