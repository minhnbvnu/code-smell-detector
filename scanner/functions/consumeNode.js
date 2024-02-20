function consumeNode(node) {
                        scanner2.setTextPos(node.end);
                        nextToken();
                        return node;
                    }