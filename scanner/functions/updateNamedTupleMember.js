function updateNamedTupleMember(node, dotDotDotToken, name, questionToken, type) {
                return node.dotDotDotToken !== dotDotDotToken || node.name !== name || node.questionToken !== questionToken || node.type !== type ? update(createNamedTupleMember(dotDotDotToken, name, questionToken, type), node) : node;
            }