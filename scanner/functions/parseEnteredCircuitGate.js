function parseEnteredCircuitGate() {
            let circuit = fromJsonText_CircuitDefinition(latestInspectorText);
            let gate = parseUserGateFromCircuitRange(
                circuit,
                valueElsePlaceholder(txtCols),
                valueElsePlaceholder(txtRows),
                txtName.value.trim());
            return {gate, circuit};
        }