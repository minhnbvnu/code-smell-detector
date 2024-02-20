function isOrMayContainReturnCompletion(node) {
                return node.transformFlags & 4194304 /* ContainsHoistedDeclarationOrCompletion */ && (isReturnStatement(node) || isIfStatement(node) || isWithStatement(node) || isSwitchStatement(node) || isCaseBlock(node) || isCaseClause(node) || isDefaultClause(node) || isTryStatement(node) || isCatchClause(node) || isLabeledStatement(node) || isIterationStatement(node, 
                /*lookInLabeledStatements*/
                false) || isBlock(node));
            }