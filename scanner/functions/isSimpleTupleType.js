function isSimpleTupleType(node) {
                return isTupleTypeNode(node) && length(node.elements) > 0 && !some(node.elements, (e) => isOptionalTypeNode(e) || isRestTypeNode(e) || isNamedTupleMember(e) && !!(e.questionToken || e.dotDotDotToken));
            }