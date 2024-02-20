function declareSourceFileMember(node, symbolFlags, symbolExcludes) {
                return isExternalModule(file) ? declareModuleMember(node, symbolFlags, symbolExcludes) : declareSymbol(file.locals, 
                /*parent*/
                void 0, node, symbolFlags, symbolExcludes);
            }