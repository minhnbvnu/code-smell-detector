function checkLoop(node) {
                if (checkLoops) {
                    trackConstantConditionLoop(node);
                }
            }