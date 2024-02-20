function genOpSourceList(left, op, right) {
    return {
        sections: ["(", ` ${op} `, ")"],
        values: [left, right],
    };
}