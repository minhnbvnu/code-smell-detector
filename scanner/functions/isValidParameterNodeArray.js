function isValidParameterNodeArray(parameters, checker) {
            return getRefactorableParametersLength(parameters) >= minimumParameterLength && every(parameters, 
            /*callback*/
            (paramDecl) => isValidParameterDeclaration(paramDecl, checker));
        }