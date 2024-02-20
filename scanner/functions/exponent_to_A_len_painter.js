function exponent_to_A_len_painter(args) {
    let v = args.getGateContext('Input Range A');
    let denom_exponent = v === undefined ? 'ⁿ' : Util.digits_to_superscript_digits('' + v.length);
    let symbol = args.gate.symbol.replace('ⁿ', denom_exponent);
    GatePainting.paintBackground(args);
    GatePainting.paintOutline(args);
    GatePainting.paintGateSymbol(args, symbol);
}