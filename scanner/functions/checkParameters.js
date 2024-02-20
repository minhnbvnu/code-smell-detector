function checkParameters(params) {
                for (const param of params) {
                    let annotationNode;
                    switch (param.type) {
                        case utils_1.AST_NODE_TYPES.AssignmentPattern:
                            annotationNode = param.left;
                            break;
                        case utils_1.AST_NODE_TYPES.TSParameterProperty:
                            annotationNode = param.parameter;
                            // Check TS parameter property with default value like `constructor(private param: string = 'something') {}`
                            if (annotationNode &&
                                annotationNode.type === utils_1.AST_NODE_TYPES.AssignmentPattern) {
                                annotationNode = annotationNode.left;
                            }
                            break;
                        default:
                            annotationNode = param;
                            break;
                    }
                    if (annotationNode !== undefined && !annotationNode.typeAnnotation) {
                        report(param, getNodeName(param));
                    }
                }
            }