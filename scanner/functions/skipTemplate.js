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