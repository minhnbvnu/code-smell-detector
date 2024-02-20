function treeToArray(current) {
            const loop = (current2) => {
                if (!isBinaryExpression(current2)) {
                    return {
                        nodes: [current2],
                        operators: [],
                        validOperators: true,
                        hasString: isStringLiteral(current2) || isNoSubstitutionTemplateLiteral(current2)
                    };
                }
                const { nodes: nodes2, operators: operators2, hasString: leftHasString, validOperators: leftOperatorValid } = loop(current2.left);
                if (!(leftHasString || isStringLiteral(current2.right) || isTemplateExpression(current2.right))) {
                    return { nodes: [current2], operators: [], hasString: false, validOperators: true };
                }
                const currentOperatorValid = current2.operatorToken.kind === 39 /* PlusToken */;
                const validOperators2 = leftOperatorValid && currentOperatorValid;
                nodes2.push(current2.right);
                operators2.push(current2.operatorToken);
                return { nodes: nodes2, operators: operators2, hasString: true, validOperators: validOperators2 };
            };
            const { nodes, operators, validOperators, hasString } = loop(current);
            return { nodes, operators, isValidConcatenation: validOperators && hasString };
        }