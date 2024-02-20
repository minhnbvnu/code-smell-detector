function copyOutParameters(outParams, partFlags, copyDirection, statements) {
                for (const outParam of outParams) {
                    if (outParam.flags & partFlags) {
                        statements.push(factory2.createExpressionStatement(copyOutParameter(outParam, copyDirection)));
                    }
                }
            }