function detailTemplate(data) {
    const lineNumbers = new Array(data.maxLines).fill().map((_, i) => i + 1);
    const lineLink = num =>
        `<a name='L${num}'></a><a href='#L${num}'>${num}</a>`;
    const lineCount = line =>
        `<span class="cline-any cline-${line.covered}">${line.hits}</span>`;

    /* This is rendered in a `<pre>`, need control of all whitespace. */
    return [
        '<tr>',
        `<td class="line-count quiet">${lineNumbers
            .map(lineLink)
            .join('\n')}</td>`,
        `<td class="line-coverage quiet">${data.lineCoverage
            .map(lineCount)
            .join('\n')}</td>`,
        `<td class="text"><pre class="prettyprint lang-js">${data.annotatedCode.join(
            '\n'
        )}</pre></td>`,
        '</tr>'
    ].join('');
}