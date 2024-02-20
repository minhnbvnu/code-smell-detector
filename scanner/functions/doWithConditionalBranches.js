function doWithConditionalBranches(action, value, trueTarget, falseTarget) {
                const savedTrueTarget = currentTrueTarget;
                const savedFalseTarget = currentFalseTarget;
                currentTrueTarget = trueTarget;
                currentFalseTarget = falseTarget;
                action(value);
                currentTrueTarget = savedTrueTarget;
                currentFalseTarget = savedFalseTarget;
            }