function isInsert(delta) {
            return isUndo ? delta.action !== "insert" : delta.action === "insert";
        }