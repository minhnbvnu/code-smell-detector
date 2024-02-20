function checkSourceElement(node) {
                if (node) {
                    const saveCurrentNode = currentNode;
                    currentNode = node;
                    instantiationCount = 0;
                    checkSourceElementWorker(node);
                    currentNode = saveCurrentNode;
                }
            }