function parenthesizeLeftSideOfBinary(binaryOperator, leftSide) {
                return parenthesizeBinaryOperand(binaryOperator, leftSide, 
                /*isLeftSideOfBinary*/
                true);
            }