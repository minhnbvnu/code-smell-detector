function getNewTargetContainer(node) {
            const container = getThisContainer(node, 
            /*includeArrowFunctions*/
            false, 
            /*includeClassComputedPropertyName*/
            false);
            if (container) {
                switch (container.kind) {
                    case 173 /* Constructor */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                        return container;
                }
            }
            return void 0;
        }