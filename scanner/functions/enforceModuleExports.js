function enforceModuleExports() {
            const globalScope = context.getScope()
            const exportsNodes = getExportsNodes(globalScope)
            const assignList = batchAssignAllowed
                ? createAssignmentList(getModuleExportsNodes(globalScope))
                : []

            for (const node of exportsNodes) {
                // Skip if it's a batch assignment.
                if (
                    assignList.length > 0 &&
                    assignList.indexOf(getTopAssignment(node)) !== -1
                ) {
                    continue
                }

                // Report.
                context.report({
                    node,
                    loc: getLocation(node),
                    message:
                        "Unexpected access to 'exports'. Use 'module.exports' instead.",
                })
            }
        }