function copyOutParameter(outParam, copyDirection) {
                const source = copyDirection === 0 /* ToOriginal */ ? outParam.outParamName : outParam.originalName;
                const target = copyDirection === 0 /* ToOriginal */ ? outParam.originalName : outParam.outParamName;
                return factory2.createBinaryExpression(target, 63 /* EqualsToken */, source);
            }