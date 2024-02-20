function visitPatternCallback(pattern, info) {
                that.currentScope().__define(pattern, new ParameterDefinition(pattern, node, i, info.rest));
                that.referencingDefaultValue(pattern, info.assignments, null, true);
            }