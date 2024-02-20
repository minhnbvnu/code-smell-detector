function vecSourceList(...components) {
    const sections = ["vec" + components.length + "("];
    for (let i = 0; i < components.length - 1; i++) {
        sections.push(", ");
    }
    const defaultNames = [];
    for (let i = 0; i < components.length; i++) {
        defaultNames.push("uComp" + i);
    }
    sections.push(")");
    return [{ sections: sections, values: components }, defaultNames];
}