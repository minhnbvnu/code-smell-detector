function pythonify(value) {
    if (value === false) { return 'False'; }
    if (value === true) { return 'True'; }
    if (value === Infinity) { return "float('inf')"; }
    if (value === -Infinity) { return "-float('inf')"; }
    if (value === undefined || value === null) { return 'None'; }
    if (Array.isArray(value)) {
        return `[${
            value.map(function(v) { return pythonify(v); }).join(', ')
        }]`;
    }
    return JSON.stringify(value);
}