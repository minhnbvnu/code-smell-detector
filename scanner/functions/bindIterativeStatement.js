function bindIterativeStatement(node, breakTarget, continueTarget) {
                const saveBreakTarget = currentBreakTarget;
                const saveContinueTarget = currentContinueTarget;
                currentBreakTarget = breakTarget;
                currentContinueTarget = continueTarget;
                bind(node);
                currentBreakTarget = saveBreakTarget;
                currentContinueTarget = saveContinueTarget;
            }