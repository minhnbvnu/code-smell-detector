function annotatedCode(code) {
    const codeArray = code.split('\n');
    let line = 0;
    const annotated = codeArray.map(str => {
        line += 1;
        return pad(line, 6) + ': ' + str;
    });
    return annotated.join('\n');
}