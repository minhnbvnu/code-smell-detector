function tableRow(
    node,
    context,
    colorizer,
    maxNameCols,
    level,
    skipEmpty,
    skipFull,
    missingWidth
) {
    const name = nodeName(node);
    const metrics = node.getCoverageSummary();
    const isEmpty = metrics.isEmpty();
    if (skipEmpty && isEmpty) {
        return '';
    }
    if (skipFull && isFull(metrics)) {
        return '';
    }

    const mm = {
        statements: isEmpty ? 0 : metrics.statements.pct,
        branches: isEmpty ? 0 : metrics.branches.pct,
        functions: isEmpty ? 0 : metrics.functions.pct,
        lines: isEmpty ? 0 : metrics.lines.pct
    };
    const colorize = isEmpty
        ? function(str) {
              return str;
          }
        : function(str, key) {
              return colorizer(str, context.classForPercent(key, mm[key]));
          };
    const elements = [];

    elements.push(colorize(formatName(name, maxNameCols, level), 'statements'));
    elements.push(colorize(formatPct(mm.statements), 'statements'));
    elements.push(colorize(formatPct(mm.branches, PCT_COLS + 1), 'branches'));
    elements.push(colorize(formatPct(mm.functions), 'functions'));
    elements.push(colorize(formatPct(mm.lines), 'lines'));
    elements.push(
        colorizer(
            formatName(nodeMissing(node), missingWidth),
            mm.lines === 100 ? 'medium' : 'low'
        )
    );

    return elements.join(DELIM) + ' ';
}