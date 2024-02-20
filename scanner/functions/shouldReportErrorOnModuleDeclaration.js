function shouldReportErrorOnModuleDeclaration(node) {
                const instanceState = getModuleInstanceState(node);
                return instanceState === 1 /* Instantiated */ || instanceState === 2 /* ConstEnumOnly */ && shouldPreserveConstEnums(options);
            }