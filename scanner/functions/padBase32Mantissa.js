function padBase32Mantissa (s) {
    return (s + zeros(11)).slice(0, 11);
}