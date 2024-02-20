function setExportContextFlag(node) {
                if (node.flags & 16777216 /* Ambient */ && !hasExportDeclarations(node)) {
                    node.flags |= 64 /* ExportContext */;
                }
                else {
                    node.flags &= ~64 /* ExportContext */;
                }
            }