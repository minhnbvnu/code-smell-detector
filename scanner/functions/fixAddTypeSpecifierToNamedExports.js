function* fixAddTypeSpecifierToNamedExports(fixer, report) {
        if (report.node.exportKind === 'type') {
            return;
        }
        for (const specifier of report.typeBasedSpecifiers) {
            yield fixer.insertTextBefore(specifier, 'type ');
        }
    }