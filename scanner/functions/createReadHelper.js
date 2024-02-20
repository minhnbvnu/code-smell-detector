function createReadHelper(iteratorRecord, count) {
                context.requestEmitHelper(readHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__read"), 
                /*typeArguments*/
                void 0, count !== void 0 ? [iteratorRecord, factory2.createNumericLiteral(count + "")] : [iteratorRecord]);
            }