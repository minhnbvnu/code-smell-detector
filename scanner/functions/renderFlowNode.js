function renderFlowNode(flowNode2, circular) {
                            let text = getHeader(flowNode2.flags);
                            if (circular) {
                                text = `${text}#${getDebugFlowNodeId(flowNode2)}`;
                            }
                            if (hasNode(flowNode2)) {
                                if (flowNode2.node) {
                                    text += ` (${getNodeText(flowNode2.node)})`;
                                }
                            }
                            else if (isFlowSwitchClause(flowNode2)) {
                                const clauses = [];
                                for (let i = flowNode2.clauseStart; i < flowNode2.clauseEnd; i++) {
                                    const clause = flowNode2.switchStatement.caseBlock.clauses[i];
                                    if (isDefaultClause(clause)) {
                                        clauses.push("default");
                                    }
                                    else {
                                        clauses.push(getNodeText(clause.expression));
                                    }
                                }
                                text += ` (${clauses.join(", ")})`;
                            }
                            return circular === "circularity" ? `Circular(${text})` : text;
                        }