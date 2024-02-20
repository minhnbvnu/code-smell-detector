function reportBadAssignment(node, name) {
                context.report({ node, messageId: "aliasNotAssignedToThis", data: { name } });
            }