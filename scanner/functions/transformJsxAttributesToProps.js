function transformJsxAttributesToProps(attrs, children) {
                const props = flatten(spanMap(attrs, isJsxSpreadAttribute, (attrs2, isSpread) => map(attrs2, (attr) => isSpread ? transformJsxSpreadAttributeToSpreadAssignment(attr) : transformJsxAttributeToObjectLiteralElement(attr))));
                if (children) {
                    props.push(children);
                }
                return props;
            }