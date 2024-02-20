function headerTemplate(details) {
    function metricsTemplate({ pct, covered, total }, kind) {
        return `
            <div class='fl pad1y space-right2'>
                <span class="strong">${pct}% </span>
                <span class="quiet">${kind}</span>
                <span class='fraction'>${covered}/${total}</span>
            </div>
        `;
    }

    function skipTemplate(metrics) {
        const statements = metrics.statements.skipped;
        const branches = metrics.branches.skipped;
        const functions = metrics.functions.skipped;

        const countLabel = (c, label, plural) =>
            c === 0 ? [] : `${c} ${label}${c === 1 ? '' : plural}`;
        const skips = [].concat(
            countLabel(statements, 'statement', 's'),
            countLabel(functions, 'function', 's'),
            countLabel(branches, 'branch', 'es')
        );

        if (skips.length === 0) {
            return '';
        }

        return `
            <div class='fl pad1y'>
                <span class="strong">${skips.join(', ')}</span>
                <span class="quiet">Ignored</span>  &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        `;
    }

    return `
<!doctype html>
<html lang="en">
${htmlHead(details)}
<body>
<div class='wrapper'>
    <div class='pad1'>
        <h1>${details.pathHtml}</h1>
        <div class='clearfix'>
            ${metricsTemplate(details.metrics.statements, 'Statements')}
            ${metricsTemplate(details.metrics.branches, 'Branches')}
            ${metricsTemplate(details.metrics.functions, 'Functions')}
            ${metricsTemplate(details.metrics.lines, 'Lines')}
            ${skipTemplate(details.metrics)}
        </div>
        <p class="quiet">
            Press <em>n</em> or <em>j</em> to go to the next uncovered block, <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
        </p>
        <template id="filterTemplate">
            <div class="quiet">
                Filter:
                <input oninput="onInput()" type="search" id="fileSearch">
            </div>
        </template>
    </div>
    <div class='status-line ${details.reportClass}'></div>
    `;
}