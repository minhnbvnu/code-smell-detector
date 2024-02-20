function getSourceFile(fileName) {
                const program = host.getProgram();
                if (!program)
                    return void 0;
                const path = toPath3(fileName);
                const file = program.getSourceFileByPath(path);
                return file && file.resolvedPath === path ? file : void 0;
            }