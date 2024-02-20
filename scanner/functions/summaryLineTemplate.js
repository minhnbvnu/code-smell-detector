function summaryLineTemplate(details) {
    const { reportClasses, metrics, file, output } = details;
    const percentGraph = pct => {
        if (!isFinite(pct)) {
            return '';
        }

        const cls = ['cover-fill'];
        if (pct === 100) {
            cls.push('cover-full');
        }

        pct = Math.floor(pct);
        return [
            `<div class="${cls.join(' ')}" style="width: ${pct}%"></div>`,
            `<div class="cover-empty" style="width: ${100 - pct}%"></div>`
        ].join('');
    };
    const summaryType = (type, showGraph = false) => {
        const info = metrics[type];
        const reportClass = reportClasses[type];
        const result = [
            `<td data-value="${info.pct}" class="pct ${reportClass}">${info.pct}%</td>`,
            `<td data-value="${info.total}" class="abs ${reportClass}">${info.covered}/${info.total}</td>`
        ];
        if (showGraph) {
            result.unshift(
                `<td data-value="${info.pct}" class="pic ${reportClass}">`,
                `<div class="chart">${percentGraph(info.pct)}</div>`,
                `</td>`
            );
        }

        return result;
    };

    return []
        .concat(
            '<tr>',
            `<td class="file ${
                reportClasses.statements
            }" data-value="${html.escape(file)}"><a href="${html.escape(
                output
            )}">${html.escape(file)}</a></td>`,
            summaryType('statements', true),
            summaryType('branches'),
            summaryType('functions'),
            summaryType('lines'),
            '</tr>\n'
        )
        .join('\n\t');
}