function enforceExports() {
            const globalScope = context.getScope()
            const exportsNodes = getExportsNodes(globalScope)
            const moduleExportsNodes = getModuleExportsNodes(globalScope)
            const assignList = batchAssignAllowed
                ? createAssignmentList(exportsNodes)
                : []
            const batchAssignList = []

            for (const node of moduleExportsNodes) {
                // Skip if it's a batch assignment.
                if (assignList.length > 0) {
                    const found = assignList.indexOf(getTopAssignment(node))
                    if (found !== -1) {
                        batchAssignList.push(assignList[found])
                        assignList.splice(found, 1)
                        continue
                    }
                }

                // Report.
                context.report({
                    node,
                    loc: getLocation(node),
                    message:
                        "Unexpected access to 'module.exports'. Use 'exports' instead.",
                })
            }

            // Disallow direct assignment to `exports`.
            for (const node of exportsNodes) {
                // Skip if it's not assignee.
                if (!isAssignee(node)) {
                    continue
                }

                // Check if it's a batch assignment.
                if (batchAssignList.indexOf(getTopAssignment(node)) !== -1) {
                    continue
                }

                // Report.
                context.report({
                    node,
                    loc: getLocation(node),
                    message:
                        "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                })
            }
        }