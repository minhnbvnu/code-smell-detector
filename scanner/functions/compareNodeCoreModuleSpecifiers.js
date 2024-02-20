function compareNodeCoreModuleSpecifiers(a, b, importingFile, program) {
            if (startsWith(a, "node:") && !startsWith(b, "node:"))
                return shouldUseUriStyleNodeCoreModules(importingFile, program) ? -1 /* LessThan */ : 1 /* GreaterThan */;
            if (startsWith(b, "node:") && !startsWith(a, "node:"))
                return shouldUseUriStyleNodeCoreModules(importingFile, program) ? 1 /* GreaterThan */ : -1 /* LessThan */;
            return 0 /* EqualTo */;
        }