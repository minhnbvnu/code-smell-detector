function isSourceFileFromLibrary(program, node) {
            return program.isSourceFileFromExternalLibrary(node) || program.isSourceFileDefaultLibrary(node);
        }