function concatenate(a, b) {
    if (Array.isArray(a)) {
        if (! Array.isArray(b)) {
            $error('Both arguments to concatenate(a, b) must have the same type. Invoked with one array and one non-array.');
        }
        a = clone(a);
        extend(a, b);
        return a;
    } else if (is_string(a)) {
        if (! is_string(b)) {
            $error('Both arguments to concatenate(a, b) must have the same type. Invoked with one string and one non-string.');
        }
        return a + b;
    } else {
        if (Array.isArray(b)) {
            $error('Both arguments to concatenate(a, b) must have the same type. Invoked with one object and one array.');
        }
        a = clone(a);
        extend(a, b);
        return a;
    }
}