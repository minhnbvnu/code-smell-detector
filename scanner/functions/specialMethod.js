function specialMethod(methodDefinition) {
        return methodDefinition.kind === 'get' ||
               methodDefinition.kind === 'set' ||
               methodDefinition.value.generator;
    }