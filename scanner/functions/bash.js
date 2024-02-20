function* bash(code, parseMarkdown, options) {
    let i = 0;
    let prevI = 0;
    const N = code.length;
    while (i < N) {
        const c1 = code[i];
        if (c1 === '#') {
            const j = code.indexOf('\n', i);
            const end = j === -1 ? N : j;
            if (i > prevI) {
                yield new raw_1.Raw(code.slice(prevI, i + 2));
            }
            yield parseMarkdown(code.slice(i + 2, end), options);
            prevI = i = end;
        }
        else {
            i++;
        }
    }
    if (prevI < N) {
        yield new raw_1.Raw(code.slice(prevI, N));
    }
}