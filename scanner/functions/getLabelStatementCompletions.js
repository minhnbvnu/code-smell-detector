function getLabelStatementCompletions(node) {
            const entries = [];
            const uniques = /* @__PURE__ */ new Map();
            let current = node;
            while (current) {
                if (isFunctionLike(current)) {
                    break;
                }
                if (isLabeledStatement(current)) {
                    const name = current.label.text;
                    if (!uniques.has(name)) {
                        uniques.set(name, true);
                        entries.push({
                            name,
                            kindModifiers: "" /* none */,
                            kind: "label" /* label */,
                            sortText: SortText.LocationPriority
                        });
                    }
                }
                current = current.parent;
            }
            return entries;
        }