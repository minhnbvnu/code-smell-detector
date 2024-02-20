function reportFlowControlError(node) {
                const block = findAncestor(node, isFunctionOrModuleBlock);
                const sourceFile = getSourceFileOfNode(node);
                const span = getSpanOfTokenAtPosition(sourceFile, block.statements.pos);
                diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.The_containing_function_or_module_body_is_too_large_for_control_flow_analysis));
            }