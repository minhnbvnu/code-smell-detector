function updateConditionalTypeNode(node, checkType, extendsType, trueType, falseType) {
                return node.checkType !== checkType || node.extendsType !== extendsType || node.trueType !== trueType || node.falseType !== falseType ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node) : node;
            }