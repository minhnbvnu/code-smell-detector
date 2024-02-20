function hasReferenceInTDZ(node) {
        const initStart = node.range[0];
        const initEnd = node.range[1];
        return variable => {
            const id = variable.defs[0].name;
            const idStart = id.range[0];
            const defaultValue = (id.parent.type === "AssignmentPattern" ? id.parent.right : null);
            const defaultStart = defaultValue && defaultValue.range[0];
            const defaultEnd = defaultValue && defaultValue.range[1];
            return variable.references.some(reference => {
                const start = reference.identifier.range[0];
                const end = reference.identifier.range[1];
                return !reference.init && (start < idStart ||
                    (defaultValue !== null && start >= defaultStart && end <= defaultEnd) ||
                    (!astUtils.isFunction(node) && start >= initStart && end <= initEnd));
            });
        };
    }