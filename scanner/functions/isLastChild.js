function isLastChild(node) {
        const t = node.parent.type;
        if (t === "IfStatement" && node.parent.consequent === node && node.parent.alternate) { // before `else` keyword.
            return true;
        }
        if (t === "DoWhileStatement") { // before `while` keyword.
            return true;
        }
        const nodeList = getChildren(node.parent);
        return nodeList !== null && nodeList[nodeList.length - 1] === node; // before `}` or etc.
    }