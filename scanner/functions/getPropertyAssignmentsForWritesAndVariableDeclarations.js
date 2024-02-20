function getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes) {
            const variableAssignments = map(exposedVariableDeclarations, (v) => factory.createShorthandPropertyAssignment(v.symbol.name));
            const writeAssignments = map(writes, (w) => factory.createShorthandPropertyAssignment(w.symbol.name));
            return variableAssignments === void 0 ? writeAssignments : writeAssignments === void 0 ? variableAssignments : variableAssignments.concat(writeAssignments);
        }