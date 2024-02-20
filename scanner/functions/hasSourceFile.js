function hasSourceFile(file) {
                return realProgram ? !!realProgram.getSourceFileByPath(file) : builderProgram ? builderProgram.getState().fileInfos.has(file) : !!find(program, (rootFile) => toPath3(rootFile) === file);
            }