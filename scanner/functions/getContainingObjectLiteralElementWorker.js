function getContainingObjectLiteralElementWorker(node) {
            switch (node.kind) {
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 8 /* NumericLiteral */:
                    if (node.parent.kind === 164 /* ComputedPropertyName */) {
                        return isObjectLiteralElement(node.parent.parent) ? node.parent.parent : void 0;
                    }
                case 79 /* Identifier */:
                    return isObjectLiteralElement(node.parent) && (node.parent.parent.kind === 207 /* ObjectLiteralExpression */ || node.parent.parent.kind === 289 /* JsxAttributes */) && node.parent.name === node ? node.parent : void 0;
            }
            return void 0;
        }