function bindDestructuringAssignmentFlow(node) {
                if (inAssignmentPattern) {
                    inAssignmentPattern = false;
                    bind(node.operatorToken);
                    bind(node.right);
                    inAssignmentPattern = true;
                    bind(node.left);
                }
                else {
                    inAssignmentPattern = true;
                    bind(node.left);
                    inAssignmentPattern = false;
                    bind(node.operatorToken);
                    bind(node.right);
                }
                bindAssignmentTargetFlow(node.left);
            }