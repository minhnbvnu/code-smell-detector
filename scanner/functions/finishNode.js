function finishNode(node, pos, end) {
                        setTextRangePosEnd(node, pos, end != null ? end : scanner2.getStartPos());
                        if (contextFlags) {
                            node.flags |= contextFlags;
                        }
                        if (parseErrorBeforeNextFinishedNode) {
                            parseErrorBeforeNextFinishedNode = false;
                            node.flags |= 131072 /* ThisNodeHasError */;
                        }
                        return node;
                    }