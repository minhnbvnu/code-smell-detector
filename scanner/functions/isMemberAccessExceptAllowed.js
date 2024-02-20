function isMemberAccessExceptAllowed(reference) {
                const node = reference.identifier;
                const parent = node.parent;
                return (parent.type === "MemberExpression" &&
                    parent.object === node &&
                    !isAllowed(parent));
            }