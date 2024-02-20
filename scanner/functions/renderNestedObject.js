function renderNestedObject(obj) {
    let output = '';
    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            output += `<dt class="col-sm-3">${filterXSS(key)}:</dt><dd class="col-sm-9"><br /><dl class="row">${renderNestedObject(value)}</dl></dd>`;
        } else {
            output += `<dt class="col-sm-3">${filterXSS(key)}:</dt><dd class="col-sm-9">${filterXSS(value)}</dd>`;
        }
    });
    return output;
}