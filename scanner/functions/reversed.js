function reversed(a) {
    if (Array.isArray(a)) {
        const c = clone(a);
        reverse(c);
        return c;
    } else {
        // String case
        return a.split('').reverse().join('');
    }
}