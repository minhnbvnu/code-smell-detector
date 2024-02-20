function exitArrowFunction(node) {
                if (isCalleeOfBindMethod(node)) {
                    report(node);
                }
            }