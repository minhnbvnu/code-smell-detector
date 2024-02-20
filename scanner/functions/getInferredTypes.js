function getInferredTypes(context) {
                const result = [];
                for (let i = 0; i < context.inferences.length; i++) {
                    result.push(getInferredType(context, i));
                }
                return result;
            }