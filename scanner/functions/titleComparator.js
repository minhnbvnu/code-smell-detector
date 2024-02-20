function titleComparator(A, B) {
    const a = A.title.toLowerCase().replace(/^(a|the) /, '');
    const b = B.title.toLowerCase().replace(/^(a|the) /, '');
    return a.localeCompare(b);
}