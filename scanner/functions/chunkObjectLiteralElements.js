function chunkObjectLiteralElements(elements) {
                let chunkObject;
                const objects = [];
                for (const e of elements) {
                    if (e.kind === 301 /* SpreadAssignment */) {
                        if (chunkObject) {
                            objects.push(factory2.createObjectLiteralExpression(chunkObject));
                            chunkObject = void 0;
                        }
                        const target = e.expression;
                        objects.push(visitNode(target, visitor, isExpression));
                    }
                    else {
                        chunkObject = append(chunkObject, e.kind === 299 /* PropertyAssignment */ ? factory2.createPropertyAssignment(e.name, visitNode(e.initializer, visitor, isExpression)) : visitNode(e, visitor, isObjectLiteralElementLike));
                    }
                }
                if (chunkObject) {
                    objects.push(factory2.createObjectLiteralExpression(chunkObject));
                }
                return objects;
            }