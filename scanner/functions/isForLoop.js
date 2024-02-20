function isForLoop(block) {
        return block.type === "ForInStatement" ||
            block.type === "ForOfStatement" ||
            block.type === "ForStatement";
    }