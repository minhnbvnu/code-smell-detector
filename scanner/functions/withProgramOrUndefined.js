function withProgramOrUndefined(action) {
                executeSteps(0 /* CreateProgram */);
                return program && action(program);
            }