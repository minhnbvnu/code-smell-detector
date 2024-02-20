function addDefaultValueAssignmentsIfNeeded2(statements, node) {
                if (!some(node.parameters, hasDefaultValueOrBindingPattern)) {
                    return false;
                }
                let added = false;
                for (const parameter of node.parameters) {
                    const { name, initializer, dotDotDotToken } = parameter;
                    if (dotDotDotToken) {
                        continue;
                    }
                    if (isBindingPattern(name)) {
                        added = insertDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer) || added;
                    }
                    else if (initializer) {
                        insertDefaultValueAssignmentForInitializer(statements, parameter, name, initializer);
                        added = true;
                    }
                }
                return added;
            }