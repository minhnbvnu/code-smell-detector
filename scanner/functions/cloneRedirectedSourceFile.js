function cloneRedirectedSourceFile(source) {
                const node = createRedirectedSourceFile(source.redirectInfo);
                node.flags |= source.flags & ~8 /* Synthesized */;
                node.fileName = source.fileName;
                node.path = source.path;
                node.resolvedPath = source.resolvedPath;
                node.originalFileName = source.originalFileName;
                node.packageJsonLocations = source.packageJsonLocations;
                node.packageJsonScope = source.packageJsonScope;
                node.emitNode = void 0;
                return node;
            }