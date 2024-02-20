function pushNameGenerationScope(node) {
                if (node && getEmitFlags(node) & 1048576 /* ReuseTempVariableScope */) {
                    return;
                }
                tempFlagsStack.push(tempFlags);
                tempFlags = 0 /* Auto */;
                formattedNameTempFlagsStack.push(formattedNameTempFlags);
                formattedNameTempFlags = void 0;
                reservedNamesStack.push(reservedNames);
            }