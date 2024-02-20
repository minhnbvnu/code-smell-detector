function isPayable(funcNode) {
            for (let m of (funcNode.modifiers || [])) {
                if (m.name === "payable") { return true; }
            }
            return false;
        }