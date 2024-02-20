function addExtraDeclarationsForConvertedLoop(statements, state, outerState) {
                let extraVariableDeclarations;
                if (state.argumentsName) {
                    if (outerState) {
                        outerState.argumentsName = state.argumentsName;
                    }
                    else {
                        (extraVariableDeclarations || (extraVariableDeclarations = [])).push(factory2.createVariableDeclaration(state.argumentsName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createIdentifier("arguments")));
                    }
                }
                if (state.thisName) {
                    if (outerState) {
                        outerState.thisName = state.thisName;
                    }
                    else {
                        (extraVariableDeclarations || (extraVariableDeclarations = [])).push(factory2.createVariableDeclaration(state.thisName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createIdentifier("this")));
                    }
                }
                if (state.hoistedLocalVariables) {
                    if (outerState) {
                        outerState.hoistedLocalVariables = state.hoistedLocalVariables;
                    }
                    else {
                        if (!extraVariableDeclarations) {
                            extraVariableDeclarations = [];
                        }
                        for (const identifier of state.hoistedLocalVariables) {
                            extraVariableDeclarations.push(factory2.createVariableDeclaration(identifier));
                        }
                    }
                }
                if (state.loopOutParameters.length) {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    for (const outParam of state.loopOutParameters) {
                        extraVariableDeclarations.push(factory2.createVariableDeclaration(outParam.outParamName));
                    }
                }
                if (state.conditionVariable) {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    extraVariableDeclarations.push(factory2.createVariableDeclaration(state.conditionVariable, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createFalse()));
                }
                if (extraVariableDeclarations) {
                    statements.push(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(extraVariableDeclarations)));
                }
            }