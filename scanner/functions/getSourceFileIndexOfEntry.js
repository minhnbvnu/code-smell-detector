function getSourceFileIndexOfEntry(program, entry) {
                        const sourceFile = entry.kind === 0 /* Span */ ? program.getSourceFile(entry.fileName) : entry.node.getSourceFile();
                        return program.getSourceFiles().indexOf(sourceFile);
                    }