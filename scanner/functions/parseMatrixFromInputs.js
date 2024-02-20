function parseMatrixFromInputs() {
            let text = valueElsePlaceholder(txtMatrix);
            let ensureUnitary = chkFix.checked;
            return parseUserMatrix(text, ensureUnitary);
        }