function httpHeaderstoText(headers) {
    out = "";
    for (let pair of headers.entries()) {
        out = (`${out}\n${pair[0]}: ${pair[1]}`);
    };
    return out;
}