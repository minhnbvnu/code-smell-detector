function visitSuperCallInBody(node) {
                return visitCallExpressionWithPotentialCapturedThisAssignment(node, 
                /*assignToCapturedThis*/
                false);
            }