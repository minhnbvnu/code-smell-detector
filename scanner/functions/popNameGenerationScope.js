function popNameGenerationScope(node) {
                if (node && getEmitFlags(node) & 1048576 /* ReuseTempVariableScope */) {
                    return;
                }
                tempFlags = tempFlagsStack.pop();
                formattedNameTempFlags = formattedNameTempFlagsStack.pop();
                reservedNames = reservedNamesStack.pop();
            }