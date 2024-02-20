function nodePosToString(node) {
            const file = getSourceFileOfNode(node);
            const loc = getLineAndCharacterOfPosition(file, node.pos);
            return `${file.fileName}(${loc.line + 1},${loc.character + 1})`;
        }