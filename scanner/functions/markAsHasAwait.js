function markAsHasAwait() {
                if (!scopeInfo) {
                    return;
                }
                scopeInfo.hasAwait = true;
            }