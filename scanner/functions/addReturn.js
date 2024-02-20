function addReturn(node) {
                const functionState = fns[fns.length - 1];
                if (functionState && node.argument !== null) {
                    functionState.returnPresent = true;
                }
            }