function insertAwait(fixer, node, isHighPrecendence) {
                if (isHighPrecendence) {
                    return fixer.insertTextBefore(node, 'await ');
                }
                else {
                    return [
                        fixer.insertTextBefore(node, 'await ('),
                        fixer.insertTextAfter(node, ')'),
                    ];
                }
            }