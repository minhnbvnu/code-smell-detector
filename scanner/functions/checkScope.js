function checkScope() {
                const failures = checkOverloads(Array.from(currentScope.overloads.values()), currentScope.typeParameters);
                addFailures(failures);
                currentScope = scopes.pop();
            }