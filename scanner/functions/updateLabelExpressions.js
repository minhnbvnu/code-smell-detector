function updateLabelExpressions() {
                if (labelExpressions !== void 0 && labelNumbers !== void 0) {
                    for (let labelNumber2 = 0; labelNumber2 < labelNumbers.length; labelNumber2++) {
                        const labels = labelNumbers[labelNumber2];
                        if (labels !== void 0) {
                            for (const label of labels) {
                                const expressions = labelExpressions[label];
                                if (expressions !== void 0) {
                                    for (const expression of expressions) {
                                        expression.text = String(labelNumber2);
                                    }
                                }
                            }
                        }
                    }
                }
            }