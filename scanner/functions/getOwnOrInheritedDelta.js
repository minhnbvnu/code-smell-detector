function getOwnOrInheritedDelta(n, options, sourceFile) {
            let previousLine = -1 /* Unknown */;
            let child;
            while (n) {
                const line = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile)).line;
                if (previousLine !== -1 /* Unknown */ && line !== previousLine) {
                    break;
                }
                if (SmartIndenter.shouldIndentChildNode(options, n, child, sourceFile)) {
                    return options.indentSize;
                }
                previousLine = line;
                child = n;
                n = n.parent;
            }
            return 0;
        }