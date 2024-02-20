function expectedCaseIndent(node, providedSwitchIndent) {
                const switchNode = (node.type === "SwitchStatement") ? node : node.parent;
                const switchIndent = typeof providedSwitchIndent === "undefined"
                    ? getNodeIndent(switchNode).goodChar
                    : providedSwitchIndent;
                let caseIndent;
                if (caseIndentStore[switchNode.loc.start.line]) {
                    return caseIndentStore[switchNode.loc.start.line];
                }
                if (switchNode.cases.length > 0 && options.SwitchCase === 0) {
                    caseIndent = switchIndent;
                }
                else {
                    caseIndent = switchIndent + (indentSize * options.SwitchCase);
                }
                caseIndentStore[switchNode.loc.start.line] = caseIndent;
                return caseIndent;
            }