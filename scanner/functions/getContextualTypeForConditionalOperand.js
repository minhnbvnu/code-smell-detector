function getContextualTypeForConditionalOperand(node, contextFlags) {
                const conditional = node.parent;
                return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType2(conditional, contextFlags) : void 0;
            }