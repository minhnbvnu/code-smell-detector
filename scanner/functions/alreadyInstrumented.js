function alreadyInstrumented(path, visitState) {
    return path.scope.hasBinding(visitState.varName);
}