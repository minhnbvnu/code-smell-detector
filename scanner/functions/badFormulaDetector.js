function badFormulaDetector(args) {
    if (typeof args.gate.param === 'number') {
        return args.gate.param;
    } else if (typeof args.gate.param === 'string') {
        for (let t of [0.01, 0.63, 0.98]) {
            if (parseTimeFormula(args.gate.param, t, false) === undefined) {
                return 'bad\nformula';
            }
        }
        return undefined;
    } else {
        return 'bad\nvalue';
    }
}