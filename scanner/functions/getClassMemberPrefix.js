function getClassMemberPrefix(node, member) {
                return isStatic(member) ? factory2.getInternalName(node) : factory2.createPropertyAccessExpression(factory2.getInternalName(node), "prototype");
            }