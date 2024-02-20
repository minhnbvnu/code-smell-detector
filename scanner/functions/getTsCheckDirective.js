function getTsCheckDirective(source) {
        let directive;
        // needs to work around a shebang issue until https://github.com/Microsoft/TypeScript/issues/28477 is resolved
        ts.forEachLeadingCommentRange(source, (ts.getShebang(source) || '').length, (pos, end, kind) => {
            if (kind === ts.SyntaxKind.SingleLineCommentTrivia) {
                const text = source.slice(pos, end);
                const match = /^\/{2,3}\s*@ts-(no)?check(?:\s|$)/i.exec(text);
                if (match !== null)
                    directive = { pos, end, enabled: match[1] === undefined };
            }
        });
        return directive;
    }