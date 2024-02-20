function padBase32Exponent (n) {
    const exp = n.toString(32);
    return (exp.length === 1) ? '0' + exp : exp;
}