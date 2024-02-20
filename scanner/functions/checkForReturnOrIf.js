function checkForReturnOrIf(node) {
                return checkForReturn(node) || checkForIf(node);
            }