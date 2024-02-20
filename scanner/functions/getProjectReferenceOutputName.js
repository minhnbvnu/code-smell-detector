function getProjectReferenceOutputName(referencedProject, fileName) {
                const out = outFile(referencedProject.commandLine.options);
                return out ? changeExtension(out, ".d.ts" /* Dts */) : getOutputDeclarationFileName(fileName, referencedProject.commandLine, !host.useCaseSensitiveFileNames());
            }