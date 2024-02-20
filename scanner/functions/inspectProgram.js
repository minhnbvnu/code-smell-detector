function inspectProgram(emitted) {
            let node = emitted.node, body = node.body;

            if (!emitted.exit || missingNodeOnTopErrorReported) {
                return;
            }

            (body.length > 0) && (body [0].type !== "PragmaStatement") && context.report({
                node: node,
                message: "No Pragma directive found at the top of file."
            });
        }