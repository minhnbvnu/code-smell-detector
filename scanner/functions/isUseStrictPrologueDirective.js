function isUseStrictPrologueDirective(node) {
                const nodeText2 = getSourceTextOfNodeFromSourceFile(file, node.expression);
                return nodeText2 === '"use strict"' || nodeText2 === "'use strict'";
            }