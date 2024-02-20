function isEmittedFileOfProgram(program, file) {
            if (!program) {
                return false;
            }
            return program.isEmittedFile(file);
        }