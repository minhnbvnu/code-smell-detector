function genTernarySourceList(floats, success, failure, not) {
    const sourceList = {
        sections: [`(${not ? "!" : ""}(`],
        values: [],
    };
    let counter = 0;
    // generate the boolean expression
    if (floats !== null) {
        for (const f of floats) {
            counter++;
            const last = counter === floats.length;
            sourceList.values.push(f);
            sourceList.sections.push(` > 0.${last ? ") ? " : " && "}`);
        }
    }
    else {
        sourceList.sections[0] += "uCount == 0) ? ";
    }
    // generate the success expression and colon
    sourceList.values.push(success);
    sourceList.sections.push(" : ");
    // generate the failure expression
    sourceList.values.push(failure);
    sourceList.sections.push(")");
    return sourceList;
}