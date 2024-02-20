function visualizeConstant(value, indent) {
    let s = '';
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; ++i) {
        let k = keys[i];
        let v = Array.isArray(value) ? value[i] : value[k];
        k = escapeHTMLEntities(k);
        if (Array.isArray(v) || typeof v === 'object') {
            s += `<tr valign=top><td>${indent}${k}:</td><td></td><td><i>${Array.isArray(v) ? 'array' : 'object'}</i></td></tr>\n` + visualizeConstant(v, indent + '&nbsp;&nbsp;&nbsp;&nbsp;');
        } else {
            v = QRuntime.unparse(v);
            s += `<tr valign=top><td>${indent}${k}:</td><td></td><td>`;

            if (v.indexOf('\n') !== -1 && v[0] === '"' && v[v.length - 1] === '"') {
                // Multiline string. Remove the quotes and format multiline
                v = escapeHTMLEntities(v.substring(1, v.length - 1));
                s += `<table style="border-collapse:collapse; margin: -2px 0"><tr><td style="vertical-align:top"><code>&quot;</code></td><td><pre style="margin: 0 0">${v}</pre></td><td style="vertical-align:bottom"><code>&quot;</code></td></tr></table>`;
            } else {
                v = escapeHTMLEntities(v);
                s += `<code>${v}</code>`
            }
            s += '</td></tr>\n';

        }
    }
    
    return s;
}