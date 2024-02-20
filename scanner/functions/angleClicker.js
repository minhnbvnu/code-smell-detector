function angleClicker(quantityName) {
    return oldGate => {
        let txt = prompt(
            `Enter a formula to use for the ${quantityName}.\n` +
            "\n" +
            "The formula can depend on the time variable t.\n" +
            "Time t starts at -1, grows to +1 over time, then jumps back to -1.\n" +
            "Invalid results will default to 0.\n" +
            "\n" +
            "Available constants: e, pi\n" +
            "Available functions: cos, sin, acos, asin, tan, atan, ln, sqrt, exp\n" +
            "Available operators: + * / - ^",
            '' + oldGate.param);
        if (txt === null || txt.trim() === '') {
            return oldGate;
        }
        return oldGate.withParam(txt);
    };
}