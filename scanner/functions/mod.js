function mod(n, base) {
    // strictly positive modulo
    return ((n % base) + base) % base;
}