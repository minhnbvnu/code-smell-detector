function isDeclarationInConstructor(expression) {
                const thisContainer = getThisContainer(expression, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false);
                return thisContainer.kind === 173 /* Constructor */ || thisContainer.kind === 259 /* FunctionDeclaration */ || thisContainer.kind === 215 /* FunctionExpression */ && !isPrototypePropertyAssignment(thisContainer.parent);
            }