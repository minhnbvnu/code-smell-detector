function insertCaptureThisForNodeIfNeeded(statements, node) {
                if (hierarchyFacts & 65536 /* CapturedLexicalThis */ && node.kind !== 216 /* ArrowFunction */) {
                    insertCaptureThisForNode(statements, node, factory2.createThis());
                    return true;
                }
                return false;
            }