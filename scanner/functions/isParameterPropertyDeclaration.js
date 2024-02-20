function isParameterPropertyDeclaration(node, parent2) {
            return isParameter(node) && hasSyntacticModifier(node, 16476 /* ParameterPropertyModifier */) && parent2.kind === 173 /* Constructor */;
        }